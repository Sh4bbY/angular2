import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
//import '/examples/js/renderers/CanvasRenderer.js';


/* tslint:disable */

@Component({
    selector: 'my-sphere',
    template: `
        <md-card>
            <h2>Sphere</h2>
            <div #sphereContainer></div>
        </md-card>
    `,
})

export class SphereComponent implements AfterViewInit {
    @ViewChild('sphereContainer') sphereContainer: ElementRef;
    
    sphere: Sphere;
    
    ngAfterViewInit() {
        try{
            this.sphere = new Sphere(this.sphereContainer.nativeElement);
        }catch(err){
            this.sphereContainer.nativeElement.innerHTML = 'your browser does not support webgl :(';
        }
    }
}

class Sphere {
    static WIDTH   = 1200;
    static HEIGHT  = 400;
    static MOUSE_X = 0;
    static MOUSE_Y = 0;
    
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    
    constructor(element: HTMLElement) {
        this.camera   = new THREE.PerspectiveCamera(75, Sphere.WIDTH / Sphere.HEIGHT, 1, 10000);
        this.scene    = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.initialize(element);
        this.animate();
    }
    
    initialize(container: HTMLElement) {
        const separation = 100, amountX = 50, amountY = 50;
        let particles, particle;
        
        this.camera.position.z = 1000;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(Sphere.WIDTH, Sphere.HEIGHT);
        container.appendChild(this.renderer.domElement);
        
        const textureLoader = new THREE.TextureLoader();
        
        // particles
        const PI2      = Math.PI * 2;
        const material = new THREE.SpriteMaterial({
            color: 0xffffff,
            map  : textureLoader.load('/assets/img/angular.png'),
        });
        for (let i = 0; i < 1000; i++) {
            particle            = new THREE.Sprite(material);
            particle.position.x = Math.random() * 2 - 1;
            particle.position.y = Math.random() * 2 - 1;
            particle.position.z = Math.random() * 2 - 1;
            particle.position.normalize();
            particle.position.multiplyScalar(Math.random() * 10 + 450);
            particle.scale.multiplyScalar(2);
            this.scene.add(particle);
        }
        
        // lines
        for (let i = 0; i < 300; i++) {
            const geometry = new THREE.Geometry();
            const vertex   = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            vertex.normalize();
            vertex.multiplyScalar(450);
            geometry.vertices.push(vertex);
            const vertex2 = vertex.clone();
            vertex2.multiplyScalar(Math.random() * 0.3 + 1);
            geometry.vertices.push(vertex2);
            const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color  : 0xffffff,
                opacity: Math.random(),
            }));
            this.scene.add(line);
        }
        
        document.addEventListener('mousemove', onDocumentMouseMove.bind(this), false);
        // document.addEventListener('touchstart', onDocumentTouchStart.bind(this), false);
        // document.addEventListener('touchmove', onDocumentTouchMove.bind(this), false);
        //
        // window.addEventListener('resize', onWindowResize.bind(this), false);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }
    
    render() {
        this.camera.position.x += ( Sphere.MOUSE_X - this.camera.position.x ) * .05;
        this.camera.position.y += ( -Sphere.MOUSE_Y + 200 - this.camera.position.y ) * .05;
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }
}

function onDocumentMouseMove(event: MouseEvent) {
    Sphere.MOUSE_X = event.clientX - Sphere.WIDTH/2;
    Sphere.MOUSE_Y = event.clientY - Sphere.HEIGHT/2;
}
