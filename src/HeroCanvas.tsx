import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField() {
    const count = 2500
    const mesh = useRef<THREE.Points>(null!)
    const mouse = useRef(new THREE.Vector2(0, 0))
    const { viewport } = useThree()

    // 1. Create initial positions
    const [particles, originalPositions] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const orig = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 12
            const y = (Math.random() - 0.5) * 12
            const z = (Math.random() - 0.5) * 12
            pos.set([x, y, z], i * 3)
            orig.set([x, y, z], i * 3)
        }
        return [pos, orig]
    }, [count])

    // 2. Track scroll and animate
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        const innerHeight = window.innerHeight
        const isMobile = window.innerWidth < 768;

        // --- SCROLL PHASES ---
        const scrollPercent = Math.min(window.scrollY / innerHeight, 1)
        const dnaScroll = Math.max(0, Math.min((window.scrollY - (innerHeight * 1.2)) / (innerHeight * 0.8), 1))
        const scatterBurst = Math.sin(dnaScroll * Math.PI)

        let hudProgress = 0;
        const pinnedSection = document.getElementById('pinned-hud-section');
        if (pinnedSection) {
            const { top, height } = pinnedSection.getBoundingClientRect();
            hudProgress = Math.max(0, Math.min(-top / (height - innerHeight || 1), 1));
        }

        let csProgress = 0;
        const csSection = document.getElementById('case-studies-section');
        if (csSection) {
            const { top } = csSection.getBoundingClientRect();
            // FIX 1: Aggressive Lock. This forces the line to 100% completion over just 200 pixels. 
            // It makes it completely immune to the address bar resizing glitch.
            csProgress = Math.max(0, Math.min((innerHeight - top) / 200, 1));
        }

        let contactProgress = 0;
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
            const { top } = contactSection.getBoundingClientRect();
            // FIX 2: Delayed Shatter. It will not start exploding the line until the Contact section 
            // is 30% of the way up the screen, preventing the "vanishing line" issue.
            contactProgress = Math.max(0, Math.min(((innerHeight * 0.7) - top) / 400, 1));
        }

        // --- DYNAMIC CAMERA ---
        let camZ = THREE.MathUtils.lerp(5, 0.8, hudProgress);
        camZ = THREE.MathUtils.lerp(camZ, 5, csProgress);
        camZ = THREE.MathUtils.lerp(camZ, 6, contactProgress);
        state.camera.position.z = camZ;

        let camX = THREE.MathUtils.lerp(0, isMobile ? -0.5 : 1.5, hudProgress);
        camX = THREE.MathUtils.lerp(camX, 0, csProgress);
        state.camera.position.x = camX;

        // Fixes the camera perspective slant
        let lookY = THREE.MathUtils.lerp(-0.5, 0, csProgress);
        state.camera.lookAt(0, lookY, 0);

        mouse.current.x = (state.mouse.x * viewport.width) / 2
        mouse.current.y = (state.mouse.y * viewport.height) / 2

        const positions = mesh.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            let x = originalPositions[i3]
            let y = originalPositions[i3 + 1]
            let z = originalPositions[i3 + 2]

            const targetX = (i / count) * 10 - 5
            const targetY = Math.pow(i / count, 3) * 5 - 2

            x = THREE.MathUtils.lerp(x + Math.sin(time * 0.2 + i) * 0.1, targetX, scrollPercent)
            y = THREE.MathUtils.lerp(y + Math.cos(time * 0.2 + i) * 0.1, targetY, scrollPercent)
            z = THREE.MathUtils.lerp(z, 0, scrollPercent)

            if (scrollPercent < 0.8) {
                const dx = x - mouse.current.x
                const dy = y - mouse.current.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 2) {
                    const force = (2 - dist) / 2
                    x += dx * force * (1 - scrollPercent)
                    y += dy * force * (1 - scrollPercent)
                }
            }

            // DNA Helix Logic
            let dnaX, dnaY, dnaZ;
            const dnaLength = 16;
            const dnaRadius = 1.0;
            const helixTurns = 3;
            const yOffset = -0.5;

            if (i < 1000) {
                const p = i / 1000;
                const angle = p * Math.PI * 2 * helixTurns + (time * 0.8);
                dnaX = (p * dnaLength) - (dnaLength / 2);
                dnaY = Math.cos(angle) * dnaRadius + yOffset;
                dnaZ = Math.sin(angle) * dnaRadius;
            } else if (i < 2000) {
                const p = (i - 1000) / 1000;
                const angle = p * Math.PI * 2 * helixTurns + Math.PI + (time * 0.8);
                dnaX = (p * dnaLength) - (dnaLength / 2);
                dnaY = Math.cos(angle) * dnaRadius + yOffset;
                dnaZ = Math.sin(angle) * dnaRadius;
            } else {
                const rungIndex = Math.floor((i - 2000) / 20);
                const p = rungIndex / 24;
                const angle1 = p * Math.PI * 2 * helixTurns + (time * 0.8);
                const angle2 = angle1 + Math.PI;
                const x1 = (p * dnaLength) - (dnaLength / 2);
                const y1 = Math.cos(angle1) * dnaRadius + yOffset;
                const z1 = Math.sin(angle1) * dnaRadius;
                const x2 = (p * dnaLength) - (dnaLength / 2);
                const y2 = Math.cos(angle2) * dnaRadius + yOffset;
                const z2 = Math.sin(angle2) * dnaRadius;
                dnaX = THREE.MathUtils.lerp(x1, x2, ((i - 2000) % 20) / 19);
                dnaY = THREE.MathUtils.lerp(y1, y2, ((i - 2000) % 20) / 19);
                dnaZ = THREE.MathUtils.lerp(z1, z2, ((i - 2000) % 20) / 19);
            }

            x += (originalPositions[i3] * scatterBurst * 1.5)
            y += (originalPositions[i3 + 1] * scatterBurst * 1.5)
            z += (originalPositions[i3 + 2] * scatterBurst * 1.5)

            let finalX = THREE.MathUtils.lerp(x, dnaX, dnaScroll)
            let finalY = THREE.MathUtils.lerp(y, dnaY, dnaScroll)
            let finalZ = THREE.MathUtils.lerp(z, dnaZ, dnaScroll)

            // --- SMART SPLIT-LINE MORPH ---
            const lineY = (i / count) * 20 - 10;
            // The safe left-edge value
            const targetLineX = isMobile ? -0.9 : 0;

            finalX = THREE.MathUtils.lerp(finalX, targetLineX, csProgress);
            finalY = THREE.MathUtils.lerp(finalY, lineY, csProgress);
            finalZ = THREE.MathUtils.lerp(finalZ, 0, csProgress);

            // --- FINAL SHATTER ---
            const shatterX = originalPositions[i3] * 3 + Math.sin(time * 0.5 + i) * 2;
            const shatterY = originalPositions[i3 + 1] * 3 + Math.cos(time * 0.5 + i) * 2;
            const shatterZ = originalPositions[i3 + 2] * 3 + Math.sin(time * 0.3 + i) * 2;
            const easedContactProgress = Math.pow(contactProgress, 2);

            finalX = THREE.MathUtils.lerp(finalX, shatterX, easedContactProgress);
            finalY = THREE.MathUtils.lerp(finalY, shatterY, easedContactProgress);
            finalZ = THREE.MathUtils.lerp(finalZ, shatterZ, easedContactProgress);

            positions[i3] = finalX
            positions[i3 + 1] = finalY
            positions[i3 + 2] = finalZ
        }

        mesh.current.geometry.attributes.position.needsUpdate = true
        mesh.current.rotation.y = time * 0.02 * (1 - scrollPercent) * (1 - csProgress) + (time * 0.05 * contactProgress)
    })

    return (
        <points ref={mesh} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[particles, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#22c55e" transparent opacity={0.8} sizeAttenuation={true} />
        </points>
    )
}

export default function HeroCanvas() {
    return (
        <div className="fixed inset-0 z-0 bg-[#020617]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                <ParticleField />
            </Canvas>
        </div>
    )
}