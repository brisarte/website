var container, stats;

var camera, scene, renderer;

var mesh;

init();
animate();

function init() {

    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 3500 );
    camera.position.z = 3750;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 300, 3900 );

    var particles = 5000;

    var geometry = new THREE.BufferGeometry();

    geometry.addAttribute( 'position', Float32Array, particles, 3 );
    geometry.addAttribute( 'color', Float32Array, particles, 3 );

    var positions = geometry.attributes.position.array;
    var colors = geometry.attributes.color.array;

    var color = new THREE.Color();

    var n = 1000, n2 = n / 2; // particles spread in the cube

    for ( var i = 0; i < positions.length; i += 3 ) {

        // positions
        /*
           var x = Math.random() * n - n2;
           var y = Math.random() * n - n2;
           var z = Math.random() * n - n2;
         */
        var x = 2000*Math.sin(i*0.114)*Math.cos(i*0.414);
        var y = 2300*Math.sin(i*0.314)*Math.cos(i*0.314);
        var z = 2000*Math.sin(i*0.614)*Math.cos(i*0.814);

        positions[ i ]     = x;
        positions[ i + 1 ] = y;
        positions[ i + 2 ] = z;

        // colors

        var vx = ( x / n ) + 0.5;
        var vy = ( y / n ) + 0.5;
        var vz = ( z / n ) + 0.5;

        color.setRGB( vx, vy, vz );

        colors[ i ]     = color.r;
        colors[ i + 1 ] = color.g;
        colors[ i + 2 ] = color.b;

    }

    geometry.computeBoundingSphere();


    var material = new THREE.ParticleSystemMaterial( { size: 35, vertexColors: true } );

    particleSystem = new THREE.Line( geometry, material );
    scene.add( particleSystem );


    renderer = new THREE.WebGLRenderer( { antialias: false, alpha: false } );
    renderer.setClearColor( scene.fog.color, 1 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.id ="canvas";

    container.appendChild( renderer.domElement );

    /*

       stats = new Stats();
       stats.domElement.style.position = 'absolute';
       stats.domElement.style.top = '0px';
       container.appendChild( stats.domElement );

     */

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    var time = Date.now() * 0.001;

    particleSystem.rotation.x = time * 0.025;
    particleSystem.rotation.y = time * 0.05;

    renderer.render( scene, camera );

}

    