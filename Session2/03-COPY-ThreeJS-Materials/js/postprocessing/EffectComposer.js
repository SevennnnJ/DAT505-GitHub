/**
 * @author alteredq / http://alteredqualia.com/
 */

three.EffectComposer = function ( renderer, renderTarget ) {

	this.renderer = renderer;

	if ( renderTarget === undefined ) {

		var parameters = {
			minFilter: three.LinearFilter,
			magFilter: three.LinearFilter,
			format: three.RGBAFormat,
			stencilBuffer: false
		};

		var size = renderer.getDrawingBufferSize( new three.Vector2() );
		renderTarget = new three.WebGLRenderTarget( size.width, size.height, parameters );
		renderTarget.texture.name = 'EffectComposer.rt1';

	}

	this.renderTarget1 = renderTarget;
	this.renderTarget2 = renderTarget.clone();
	this.renderTarget2.texture.name = 'EffectComposer.rt2';

	this.writeBuffer = this.renderTarget1;
	this.readBuffer = this.renderTarget2;

	this.passes = [];

	// dependencies

	if ( three.CopyShader === undefined ) {

		console.error( 'three.EffectComposer relies on THREE.CopyShader' );

	}

	if ( three.ShaderPass === undefined ) {

		console.error( 'three.EffectComposer relies on THREE.ShaderPass' );

	}

	this.copyPass = new three.ShaderPass( three.CopyShader );

	this._previousFrameTime = Date.now();

};

Object.assign( three.EffectComposer.prototype, {

	swapBuffers: function () {

		var tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;

	},

	addPass: function ( pass ) {

		this.passes.push( pass );

		var size = this.renderer.getDrawingBufferSize( new three.Vector2() );
		pass.setSize( size.width, size.height );

	},

	insertPass: function ( pass, index ) {

		this.passes.splice( index, 0, pass );

	},

	render: function ( deltaTime ) {

		// deltaTime value is in seconds

		if ( deltaTime === undefined ) {

			deltaTime = ( Date.now() - this._previousFrameTime ) * 0.001;

		}

		this._previousFrameTime = Date.now();

		var currentRenderTarget = this.renderer.getRenderTarget();

		var maskActive = false;

		var pass, i, il = this.passes.length;

		for ( i = 0; i < il; i ++ ) {

			pass = this.passes[ i ];

			if ( pass.enabled === false ) continue;

			pass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive );

			if ( pass.needsSwap ) {

				if ( maskActive ) {

					var context = this.renderer.context;

					context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime );

					context.stencilFunc( context.EQUAL, 1, 0xffffffff );

				}

				this.swapBuffers();

			}

			if ( three.MaskPass !== undefined ) {

				if ( pass instanceof three.MaskPass ) {

					maskActive = true;

				} else if ( pass instanceof three.ClearMaskPass ) {

					maskActive = false;

				}

			}

		}

		this.renderer.setRenderTarget( currentRenderTarget );

	},

	reset: function ( renderTarget ) {

		if ( renderTarget === undefined ) {

			var size = this.renderer.getDrawingBufferSize( new three.Vector2() );

			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize( size.width, size.height );

		}

		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

	},

	setSize: function ( width, height ) {

		this.renderTarget1.setSize( width, height );
		this.renderTarget2.setSize( width, height );

		for ( var i = 0; i < this.passes.length; i ++ ) {

			this.passes[ i ].setSize( width, height );

		}

	}

} );


three.Pass = function () {

	// if set to true, the pass is processed by the composer
	this.enabled = true;

	// if set to true, the pass indicates to swap read and write buffer after rendering
	this.needsSwap = true;

	// if set to true, the pass clears its buffer before rendering
	this.clear = false;

	// if set to true, the result of the pass is rendered to screen
	this.renderToScreen = false;

};

Object.assign( three.Pass.prototype, {

	setSize: function ( width, height ) {},

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

	}

} );
