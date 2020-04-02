module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ Collisions_Collisions; });
__webpack_require__.d(__webpack_exports__, "Collisions", function() { return /* binding */ Collisions_Collisions; });
__webpack_require__.d(__webpack_exports__, "Result", function() { return /* reexport */ Result; });
__webpack_require__.d(__webpack_exports__, "Circle", function() { return /* reexport */ Circle_Circle; });
__webpack_require__.d(__webpack_exports__, "Polygon", function() { return /* reexport */ Polygon_Polygon; });
__webpack_require__.d(__webpack_exports__, "Point", function() { return /* reexport */ Point_Point; });

// CONCATENATED MODULE: ./src/modules/BVHBranch.mjs
/**
 * @private
 */
const branch_pool = [];

/**
 * A branch within a BVH
 * @class
 * @private
 */
class BVHBranch {
	/**
	 * @constructor
	 */
	constructor() {
		/** @private */
		this._bvh_parent = null;

		/** @private */
		this._bvh_branch = true;

		/** @private */
		this._bvh_left = null;

		/** @private */
		this._bvh_right = null;

		/** @private */
		this._bvh_sort = 0;

		/** @private */
		this._bvh_min_x = 0;

		/** @private */
		this._bvh_min_y = 0;

		/** @private */
		this._bvh_max_x = 0;

		/** @private */
		this._bvh_max_y = 0;
	}

	/**
	 * Returns a branch from the branch pool or creates a new branch
	 * @returns {BVHBranch}
	 */
	static getBranch() {
		if(branch_pool.length) {
			return branch_pool.pop();
		}

		return new BVHBranch();
	}

	/**
	 * Releases a branch back into the branch pool
	 * @param {BVHBranch} branch The branch to release
	 */
	static releaseBranch(branch) {
		branch_pool.push(branch);
	}

	/**
	 * Sorting callback used to sort branches by deepest first
	 * @param {BVHBranch} a The first branch
	 * @param {BVHBranch} b The second branch
	 * @returns {Number}
	 */
	static sortBranches(a, b) {
		return a.sort > b.sort ? -1 : 1;
	}
};

// CONCATENATED MODULE: ./src/modules/BVH.mjs


/**
 * A Bounding Volume Hierarchy (BVH) used to find potential collisions quickly
 * @class
 * @private
 */
class BVH_BVH {
	/**
	 * @constructor
	 */
	constructor() {
		/** @private */
		this._hierarchy = null;

		/** @private */
		this._bodies = [];

		/** @private */
		this._dirty_branches = [];
	}

	/**
	 * Inserts a body into the BVH
	 * @param {Circle|Polygon|Point} body The body to insert
	 * @param {Boolean} [updating = false] Set to true if the body already exists in the BVH (used internally when updating the body's position)
	 */
	insert(body, updating = false) {
		if(!updating) {
			const bvh = body._bvh;

			if(bvh && bvh !== this) {
				throw new Error('Body belongs to another collision system');
			}

			body._bvh = this;
			this._bodies.push(body);
		}

		const polygon = body._polygon;
		const body_x  = body.x;
		const body_y  = body.y;

		if(polygon) {
			if(
				body._dirty_coords ||
				body.x       !== body._x ||
				body.y       !== body._y ||
				body.angle   !== body._angle ||
				body.scale_x !== body._scale_x ||
				body.scale_y !== body._scale_y
			) {
				body._calculateCoords();
			}
		}

		const padding    = body._bvh_padding;
		const radius     = polygon ? 0 : body.radius * body.scale;
		const body_min_x = (polygon ? body._min_x : body_x - radius) - padding;
		const body_min_y = (polygon ? body._min_y : body_y - radius) - padding;
		const body_max_x = (polygon ? body._max_x : body_x + radius) + padding;
		const body_max_y = (polygon ? body._max_y : body_y + radius) + padding;

		body._bvh_min_x = body_min_x;
		body._bvh_min_y = body_min_y;
		body._bvh_max_x = body_max_x;
		body._bvh_max_y = body_max_y;

		let current = this._hierarchy;
		let sort    = 0;

		if(!current) {
			this._hierarchy = body;
		}
		else {
			while(true) {
				// Branch
				if(current._bvh_branch) {
					const left            = current._bvh_left;
					const left_min_y      = left._bvh_min_y;
					const left_max_x      = left._bvh_max_x;
					const left_max_y      = left._bvh_max_y;
					const left_new_min_x  = body_min_x < left._bvh_min_x ? body_min_x : left._bvh_min_x;
					const left_new_min_y  = body_min_y < left_min_y ? body_min_y : left_min_y;
					const left_new_max_x  = body_max_x > left_max_x ? body_max_x : left_max_x;
					const left_new_max_y  = body_max_y > left_max_y ? body_max_y : left_max_y;
					const left_volume     = (left_max_x - left._bvh_min_x) * (left_max_y - left_min_y);
					const left_new_volume = (left_new_max_x - left_new_min_x) * (left_new_max_y - left_new_min_y);
					const left_difference = left_new_volume - left_volume;

					const right            = current._bvh_right;
					const right_min_x      = right._bvh_min_x;
					const right_min_y      = right._bvh_min_y;
					const right_max_x      = right._bvh_max_x;
					const right_max_y      = right._bvh_max_y;
					const right_new_min_x  = body_min_x < right_min_x ? body_min_x : right_min_x;
					const right_new_min_y  = body_min_y < right_min_y ? body_min_y : right_min_y;
					const right_new_max_x  = body_max_x > right_max_x ? body_max_x : right_max_x;
					const right_new_max_y  = body_max_y > right_max_y ? body_max_y : right_max_y;
					const right_volume     = (right_max_x - right_min_x) * (right_max_y - right_min_y);
					const right_new_volume = (right_new_max_x - right_new_min_x) * (right_new_max_y - right_new_min_y);
					const right_difference = right_new_volume - right_volume;

					current._bvh_sort  = sort++;
					current._bvh_min_x = left_new_min_x < right_new_min_x ? left_new_min_x : right_new_min_x;
					current._bvh_min_y = left_new_min_y < right_new_min_y ? left_new_min_y : right_new_min_y;
					current._bvh_max_x = left_new_max_x > right_new_max_x ? left_new_max_x : right_new_max_x;
					current._bvh_max_y = left_new_max_y > right_new_max_y ? left_new_max_y : right_new_max_y;

					current = left_difference <= right_difference ? left : right;
				}
				// Leaf
				else {
					const grandparent  = current._bvh_parent;
					const parent_min_x = current._bvh_min_x;
					const parent_min_y = current._bvh_min_y;
					const parent_max_x = current._bvh_max_x;
					const parent_max_y = current._bvh_max_y;
					const new_parent   = current._bvh_parent = body._bvh_parent = BVHBranch.getBranch();

					new_parent._bvh_parent = grandparent;
					new_parent._bvh_left   = current;
					new_parent._bvh_right  = body;
					new_parent._bvh_sort   = sort++;
					new_parent._bvh_min_x  = body_min_x < parent_min_x ? body_min_x : parent_min_x;
					new_parent._bvh_min_y  = body_min_y < parent_min_y ? body_min_y : parent_min_y;
					new_parent._bvh_max_x  = body_max_x > parent_max_x ? body_max_x : parent_max_x;
					new_parent._bvh_max_y  = body_max_y > parent_max_y ? body_max_y : parent_max_y;

					if(!grandparent) {
						this._hierarchy = new_parent;
					}
					else if(grandparent._bvh_left === current) {
						grandparent._bvh_left = new_parent;
					}
					else {
						grandparent._bvh_right = new_parent;
					}

					break;
				}
			}
		}
	}

	/**
	 * Removes a body from the BVH
	 * @param {Circle|Polygon|Point} body The body to remove
	 * @param {Boolean} [updating = false] Set to true if this is a temporary removal (used internally when updating the body's position)
	 */
	remove(body, updating = false) {
		if(!updating) {
			const bvh = body._bvh;

			if(bvh && bvh !== this) {
				throw new Error('Body belongs to another collision system');
			}

			body._bvh = null;
			this._bodies.splice(this._bodies.indexOf(body), 1);
		}

		if(this._hierarchy === body) {
			this._hierarchy = null;

			return;
		}

		const parent       = body._bvh_parent;
		const grandparent  = parent._bvh_parent;
		const parent_left  = parent._bvh_left;
		const sibling      = parent_left === body ? parent._bvh_right : parent_left;

		sibling._bvh_parent = grandparent;

		if(sibling._bvh_branch) {
			sibling._bvh_sort = parent._bvh_sort;
		}

		if(grandparent) {
			if(grandparent._bvh_left === parent) {
				grandparent._bvh_left = sibling;
			}
			else {
				grandparent._bvh_right = sibling;
			}

			let branch = grandparent;

			while(branch) {
				const left       = branch._bvh_left;
				const left_min_x = left._bvh_min_x;
				const left_min_y = left._bvh_min_y;
				const left_max_x = left._bvh_max_x;
				const left_max_y = left._bvh_max_y;

				const right       = branch._bvh_right;
				const right_min_x = right._bvh_min_x;
				const right_min_y = right._bvh_min_y;
				const right_max_x = right._bvh_max_x;
				const right_max_y = right._bvh_max_y;

				branch._bvh_min_x = left_min_x < right_min_x ? left_min_x : right_min_x;
				branch._bvh_min_y = left_min_y < right_min_y ? left_min_y : right_min_y;
				branch._bvh_max_x = left_max_x > right_max_x ? left_max_x : right_max_x;
				branch._bvh_max_y = left_max_y > right_max_y ? left_max_y : right_max_y;

				branch = branch._bvh_parent;
			}
		}
		else {
			this._hierarchy = sibling;
		}

		BVHBranch.releaseBranch(parent);
	}

	/**
	 * Updates the BVH. Moved bodies are removed/inserted.
	 */
	update() {
		const bodies = this._bodies;
		const count  = bodies.length;

		for(let i = 0; i < count; ++i) {
			const body = bodies[i];

			let update = false;

			if(!update && body.padding !== body._bvh_padding) {
				body._bvh_padding = body.padding;
				update = true;
			}

			if(!update) {
				const polygon = body._polygon;

				if(polygon) {
					if(
						body._dirty_coords ||
						body.x       !== body._x ||
						body.y       !== body._y ||
						body.angle   !== body._angle ||
						body.scale_x !== body._scale_x ||
						body.scale_y !== body._scale_y
					) {
						body._calculateCoords();
					}
				}

				const x      = body.x;
				const y      = body.y;
				const radius = polygon ? 0 : body.radius * body.scale;
				const min_x  = polygon ? body._min_x : x - radius;
				const min_y  = polygon ? body._min_y : y - radius;
				const max_x  = polygon ? body._max_x : x + radius;
				const max_y  = polygon ? body._max_y : y + radius;

				update = min_x < body._bvh_min_x || min_y < body._bvh_min_y || max_x > body._bvh_max_x || max_y > body._bvh_max_y;
			}

			if(update) {
				this.remove(body, true);
				this.insert(body, true);
			}
		}
	}

	/**
	 * Returns a list of potential collisions for a body
	 * @param {Circle|Polygon|Point} body The body to test
	 * @returns {Array<Body>}
	 */
	potentials(body) {
		const results = [];
		const min_x   = body._bvh_min_x;
		const min_y   = body._bvh_min_y;
		const max_x   = body._bvh_max_x;
		const max_y   = body._bvh_max_y;

		let current       = this._hierarchy;
		let traverse_left = true;

		if(!current || !current._bvh_branch) {
			return results;
		}

		while(current) {
			if(traverse_left) {
				traverse_left = false;

				let left = current._bvh_branch ? current._bvh_left : null;

				while(
					left &&
					left._bvh_max_x >= min_x &&
					left._bvh_max_y >= min_y &&
					left._bvh_min_x <= max_x &&
					left._bvh_min_y <= max_y
				) {
					current = left;
					left    = current._bvh_branch ? current._bvh_left : null;
				}
			}

			const branch = current._bvh_branch;
			const right  = branch ? current._bvh_right : null;

			if(
				right &&
				right._bvh_max_x > min_x &&
				right._bvh_max_y > min_y &&
				right._bvh_min_x < max_x &&
				right._bvh_min_y < max_y
			) {
				current       = right;
				traverse_left = true;
			}
			else {
				if(!branch && current !== body) {
					results.push(current);
				}

				let parent = current._bvh_parent;

				if(parent) {
					while(parent && parent._bvh_right === current) {
						current = parent;
						parent  = current._bvh_parent;
					}

					current = parent;
				}
				else {
					break;
				}
			}
		}

		return results;
	}

	/**
	 * Draws the bodies within the BVH to a CanvasRenderingContext2D's current path
	 * @param {CanvasRenderingContext2D} context The context to draw to
	 */
	draw(context) {
		const bodies = this._bodies;
		const count  = bodies.length;

		for(let i = 0; i < count; ++i) {
			bodies[i].draw(context);
		}
	}

	/**
	 * Draws the BVH to a CanvasRenderingContext2D's current path. This is useful for testing out different padding values for bodies.
	 * @param {CanvasRenderingContext2D} context The context to draw to
	 */
	drawBVH(context) {
		let current       = this._hierarchy;
		let traverse_left = true;

		while(current) {
			if(traverse_left) {
				traverse_left = false;

				let left = current._bvh_branch ? current._bvh_left : null;

				while(left) {
					current = left;
					left    = current._bvh_branch ? current._bvh_left : null;
				}
			}

			const branch = current._bvh_branch;
			const min_x  = current._bvh_min_x;
			const min_y  = current._bvh_min_y;
			const max_x  = current._bvh_max_x;
			const max_y  = current._bvh_max_y;
			const right  = branch ? current._bvh_right : null;

			context.moveTo(min_x, min_y);
			context.lineTo(max_x, min_y);
			context.lineTo(max_x, max_y);
			context.lineTo(min_x, max_y);
			context.lineTo(min_x, min_y);

			if(right) {
				current       = right;
				traverse_left = true;
			}
			else {
				let parent = current._bvh_parent;

				if(parent) {
					while(parent && parent._bvh_right === current) {
						current = parent;
						parent  = current._bvh_parent;
					}

					current = parent;
				}
				else {
					break;
				}
			}
		}
	}
};

// CONCATENATED MODULE: ./src/modules/Result.mjs
/**
 * An object used to collect the detailed results of a collision test
 *
 * > **Note:** It is highly recommended you recycle the same Result object if possible in order to avoid wasting memory
 * @class
 */
class Result {
	/**
	 * @constructor
	 */
	constructor() {
		/**
		 * @desc True if a collision was detected
		 * @type {Boolean}
		 */
		this.collision = false;

		/**
		 * @desc The source body tested
		 * @type {Circle|Polygon|Point}
		 */
		this.a = null;

		/**
		 * @desc The target body tested against
		 * @type {Circle|Polygon|Point}
		 */
		this.b = null;

		/**
		 * @desc True if A is completely contained within B
		 * @type {Boolean}
		 */
		this.a_in_b = false;

		/**
		 * @desc True if B is completely contained within A
		 * @type {Boolean}
		 */
		this.b_in_a = false;

		/**
		 * @desc The magnitude of the shortest axis of overlap
		 * @type {Number}
		 */
		this.overlap = 0;

		/**
		 * @desc The X direction of the shortest axis of overlap
		 * @type {Number}
		 */
		this.overlap_x = 0;

		/**
		 * @desc The Y direction of the shortest axis of overlap
		 * @type {Number}
		 */
		this.overlap_y = 0;
	}
};

// CONCATENATED MODULE: ./src/modules/SAT.mjs
/**
 * Determines if two bodies are colliding using the Separating Axis Theorem
 * @private
 * @param {Circle|Polygon|Point} a The source body to test
 * @param {Circle|Polygon|Point} b The target body to test against
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own collision heuristic)
 * @returns {Boolean}
 */
function SAT(a, b, result = null, aabb = true) {
	const a_polygon = a._polygon;
	const b_polygon = b._polygon;

	let collision = false;

	if(result) {
		result.a         = a;
		result.b         = b;
		result.a_in_b    = true;
		result.b_in_a    = true;
		result.overlap   = null;
		result.overlap_x = 0;
		result.overlap_y = 0;
	}

	if(a_polygon) {
		if(
			a._dirty_coords ||
			a.x       !== a._x ||
			a.y       !== a._y ||
			a.angle   !== a._angle ||
			a.scale_x !== a._scale_x ||
			a.scale_y !== a._scale_y
		) {
			a._calculateCoords();
		}
	}

	if(b_polygon) {
		if(
			b._dirty_coords ||
			b.x       !== b._x ||
			b.y       !== b._y ||
			b.angle   !== b._angle ||
			b.scale_x !== b._scale_x ||
			b.scale_y !== b._scale_y
		) {
			b._calculateCoords();
		}
	}

	if(!aabb || aabbAABB(a, b)) {
		if(a_polygon && a._dirty_normals) {
			a._calculateNormals();
		}

		if(b_polygon && b._dirty_normals) {
			b._calculateNormals();
		}

		collision = (
			a_polygon && b_polygon ? polygonPolygon(a, b, result) :
			a_polygon ? polygonCircle(a, b, result, false) :
			b_polygon ? polygonCircle(b, a, result, true) :
			circleCircle(a, b, result)
		);
	}

	if(result) {
		result.collision = collision;
	}

	return collision;
};

/**
 * Determines if two bodies' axis aligned bounding boxes are colliding
 * @param {Circle|Polygon|Point} a The source body to test
 * @param {Circle|Polygon|Point} b The target body to test against
 */
function aabbAABB(a, b) {
	const a_polygon = a._polygon;
	const a_x       = a_polygon ? 0 : a.x;
	const a_y       = a_polygon ? 0 : a.y;
	const a_radius  = a_polygon ? 0 : a.radius * a.scale;
	const a_min_x   = a_polygon ? a._min_x : a_x - a_radius;
	const a_min_y   = a_polygon ? a._min_y : a_y - a_radius;
	const a_max_x   = a_polygon ? a._max_x : a_x + a_radius;
	const a_max_y   = a_polygon ? a._max_y : a_y + a_radius;

	const b_polygon = b._polygon;
	const b_x       = b_polygon ? 0 : b.x;
	const b_y       = b_polygon ? 0 : b.y;
	const b_radius  = b_polygon ? 0 : b.radius * b.scale;
	const b_min_x   = b_polygon ? b._min_x : b_x - b_radius;
	const b_min_y   = b_polygon ? b._min_y : b_y - b_radius;
	const b_max_x   = b_polygon ? b._max_x : b_x + b_radius;
	const b_max_y   = b_polygon ? b._max_y : b_y + b_radius;

	return a_min_x < b_max_x && a_min_y < b_max_y && a_max_x > b_min_x && a_max_y > b_min_y;
}

/**
 * Determines if two polygons are colliding
 * @param {Polygon} a The source polygon to test
 * @param {Polygon} b The target polygon to test against
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @returns {Boolean}
 */
function polygonPolygon(a, b, result = null) {
	const a_count = a._coords.length;
	const b_count = b._coords.length;

	// Handle points specially
	if(a_count === 2 && b_count === 2) {
		const a_coords = a._coords;
		const b_coords = b._coords;

		if(result) {
			result.overlap = 0;
		}

		return a_coords[0] === b_coords[0] && a_coords[1] === b_coords[1];
	}

	const a_coords  = a._coords;
	const b_coords  = b._coords;
	const a_normals = a._normals;
	const b_normals = b._normals;

	if(a_count > 2) {
		for(let ix = 0, iy = 1; ix < a_count; ix += 2, iy += 2) {
			if(separatingAxis(a_coords, b_coords, a_normals[ix], a_normals[iy], result)) {
				return false;
			}
		}
	}

	if(b_count > 2) {
		for(let ix = 0, iy = 1; ix < b_count; ix += 2, iy += 2) {
			if(separatingAxis(a_coords, b_coords, b_normals[ix], b_normals[iy], result)) {
				return false;
			}
		}
	}

	return true;
}

/**
 * Determines if a polygon and a circle are colliding
 * @param {Polygon} a The source polygon to test
 * @param {Circle} b The target circle to test against
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @param {Boolean} [reverse = false] Set to true to reverse a and b in the result parameter when testing circle->polygon instead of polygon->circle
 * @returns {Boolean}
 */
function polygonCircle(a, b, result = null, reverse = false) {
	const a_coords       = a._coords;
	const a_edges        = a._edges;
	const a_normals      = a._normals;
	const b_x            = b.x;
	const b_y            = b.y;
	const b_radius       = b.radius * b.scale;
	const b_radius2      = b_radius * 2;
	const radius_squared = b_radius * b_radius;
	const count          = a_coords.length;

	let a_in_b    = true;
	let b_in_a    = true;
	let overlap   = null;
	let overlap_x = 0;
	let overlap_y = 0;

	// Handle points specially
	if(count === 2) {
		const coord_x        = b_x - a_coords[0];
		const coord_y        = b_y - a_coords[1];
		const length_squared = coord_x * coord_x + coord_y * coord_y;

		if(length_squared > radius_squared) {
			return false;
		}

		if(result) {
			const length = Math.sqrt(length_squared);

			overlap   = b_radius - length;
			overlap_x = coord_x / length;
			overlap_y = coord_y / length;
			b_in_a    = false;
		}
	}
	else {
		for(let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
			const coord_x = b_x - a_coords[ix];
			const coord_y = b_y - a_coords[iy];
			const edge_x  = a_edges[ix];
			const edge_y  = a_edges[iy];
			const dot     = coord_x * edge_x + coord_y * edge_y;
			const region  = dot < 0 ? -1 : dot > edge_x * edge_x + edge_y * edge_y ? 1 : 0;

			let tmp_overlapping = false;
			let tmp_overlap     = 0;
			let tmp_overlap_x   = 0;
			let tmp_overlap_y   = 0;

			if(result && a_in_b && coord_x * coord_x + coord_y * coord_y > radius_squared) {
				a_in_b = false;
			}

			if(region) {
				const left     = region === -1;
				const other_x  = left ? (ix === 0 ? count - 2 : ix - 2) : (ix === count - 2 ? 0 : ix + 2);
				const other_y  = other_x + 1;
				const coord2_x = b_x - a_coords[other_x];
				const coord2_y = b_y - a_coords[other_y];
				const edge2_x  = a_edges[other_x];
				const edge2_y  = a_edges[other_y];
				const dot2     = coord2_x * edge2_x + coord2_y * edge2_y;
				const region2  = dot2 < 0 ? -1 : dot2 > edge2_x * edge2_x + edge2_y * edge2_y ? 1 : 0;

				if(region2 === -region) {
					const target_x       = left ? coord_x : coord2_x;
					const target_y       = left ? coord_y : coord2_y;
					const length_squared = target_x * target_x + target_y * target_y;

					if(length_squared > radius_squared) {
						return false;
					}

					if(result) {
						const length = Math.sqrt(length_squared);

						tmp_overlapping = true;
						tmp_overlap     = b_radius - length;
						tmp_overlap_x   = target_x / length;
						tmp_overlap_y   = target_y / length;
						b_in_a          = false;
					}
				}
			}
			else {
				const normal_x        = a_normals[ix];
				const normal_y        = a_normals[iy];
				const length          = coord_x * normal_x + coord_y * normal_y;
				const absolute_length = length < 0 ? -length : length;

				if(length > 0 && absolute_length > b_radius) {
					return false;
				}

				if(result) {
					tmp_overlapping = true;
					tmp_overlap     = b_radius - length;
					tmp_overlap_x   = normal_x;
					tmp_overlap_y   = normal_y;

					if(b_in_a && length >= 0 || tmp_overlap < b_radius2) {
						b_in_a = false;
					}
				}
			}

			if(tmp_overlapping && (overlap === null || overlap > tmp_overlap)) {
				overlap   = tmp_overlap;
				overlap_x = tmp_overlap_x;
				overlap_y = tmp_overlap_y;
			}
		}
	}

	if(result) {
		result.a_in_b    = reverse ? b_in_a : a_in_b;
		result.b_in_a    = reverse ? a_in_b : b_in_a;
		result.overlap   = overlap;
		result.overlap_x = reverse ? -overlap_x : overlap_x;
		result.overlap_y = reverse ? -overlap_y : overlap_y;
	}

	return true;
}

/**
 * Determines if two circles are colliding
 * @param {Circle} a The source circle to test
 * @param {Circle} b The target circle to test against
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @returns {Boolean}
 */
function circleCircle(a, b, result = null) {
	const a_radius       = a.radius * a.scale;
	const b_radius       = b.radius * b.scale;
	const difference_x   = b.x - a.x;
	const difference_y   = b.y - a.y;
	const radius_sum     = a_radius + b_radius;
	const length_squared = difference_x * difference_x + difference_y * difference_y;

	if(length_squared > radius_sum * radius_sum) {
		return false;
	}

	if(result) {
		const length = Math.sqrt(length_squared);

		result.a_in_b    = a_radius <= b_radius && length <= b_radius - a_radius;
		result.b_in_a    = b_radius <= a_radius && length <= a_radius - b_radius;
		result.overlap   = radius_sum - length;
		result.overlap_x = difference_x / length;
		result.overlap_y = difference_y / length;
	}

	return true;
}

/**
 * Determines if two polygons are separated by an axis
 * @param {Array<Number[]>} a_coords The coordinates of the polygon to test
 * @param {Array<Number[]>} b_coords The coordinates of the polygon to test against
 * @param {Number} x The X direction of the axis
 * @param {Number} y The Y direction of the axis
 * @param {Result} [result = null] A Result object on which to store information about the collision
 * @returns {Boolean}
 */
function separatingAxis(a_coords, b_coords, x, y, result = null) {
	const a_count = a_coords.length;
	const b_count = b_coords.length;

	if(!a_count || !b_count) {
		return true;
	}

	let a_start = null;
	let a_end   = null;
	let b_start = null;
	let b_end   = null;

	for(let ix = 0, iy = 1; ix < a_count; ix += 2, iy += 2) {
		const dot = a_coords[ix] * x + a_coords[iy] * y;

		if(a_start === null || a_start > dot) {
			a_start = dot;
		}

		if(a_end === null || a_end < dot) {
			a_end = dot;
		}
	}

	for(let ix = 0, iy = 1; ix < b_count; ix += 2, iy += 2) {
		const dot = b_coords[ix] * x + b_coords[iy] * y;

		if(b_start === null || b_start > dot) {
			b_start = dot;
		}

		if(b_end === null || b_end < dot) {
			b_end = dot;
		}
	}

	if(a_start > b_end || a_end < b_start) {
		return true;
	}

	if(result) {
		let overlap = 0;

		if(a_start < b_start) {
			result.a_in_b = false;

			if(a_end < b_end) {
				overlap       = a_end - b_start;
				result.b_in_a = false;
			}
			else {
				const option1 = a_end - b_start;
				const option2 = b_end - a_start;

				overlap = option1 < option2 ? option1 : -option2;
			}
		}
		else {
			result.b_in_a = false;

			if(a_end > b_end) {
				overlap       = a_start - b_end;
				result.a_in_b = false;
			}
			else {
				const option1 = a_end - b_start;
				const option2 = b_end - a_start;

				overlap = option1 < option2 ? option1 : -option2;
			}
		}

		const current_overlap  = result.overlap;
		const absolute_overlap = overlap < 0 ? -overlap : overlap;

		if(current_overlap === null || current_overlap > absolute_overlap) {
			const sign = overlap < 0 ? -1 : 1;

			result.overlap   = absolute_overlap;
			result.overlap_x = x * sign;
			result.overlap_y = y * sign;
		}
	}

	return false;
}

// CONCATENATED MODULE: ./src/modules/Body.mjs



/**
 * The base class for bodies used to detect collisions
 * @class
 * @protected
 */
class Body_Body {
	/**
	 * @constructor
	 * @param {Number} [x = 0] The starting X coordinate
	 * @param {Number} [y = 0] The starting Y coordinate
	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
	 */
	constructor(x = 0, y = 0, padding = 0) {
		/**
		 * @desc The X coordinate of the body
		 * @type {Number}
		 */
		this.x = x;

		/**
		 * @desc The Y coordinate of the body
		 * @type {Number}
		 */
		this.y = y;

		/**
		 * @desc The amount to pad the bounding volume when testing for potential collisions
		 * @type {Number}
		 */
		this.padding = padding;

		/** @private */
		this._circle = false;

		/** @private */
		this._polygon = false;

		/** @private */
		this._point = false;

		/** @private */
		this._bvh = null;

		/** @private */
		this._bvh_parent = null;

		/** @private */
		this._bvh_branch = false;

		/** @private */
		this._bvh_padding = padding;

		/** @private */
		this._bvh_min_x = 0;

		/** @private */
		this._bvh_min_y = 0;

		/** @private */
		this._bvh_max_x = 0;

		/** @private */
		this._bvh_max_y = 0;
	}

	/**
	 * Determines if the body is colliding with another body
	 * @param {Circle|Polygon|Point} target The target body to test against
	 * @param {Result} [result = null] A Result object on which to store information about the collision
	 * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own potential collision heuristic)
	 * @returns {Boolean}
	 */
	collides(target, result = null, aabb = true) {
		return SAT(this, target, result, aabb);
	}

	/**
	 * Returns a list of potential collisions
	 * @returns {Array<Body>}
	 */
	potentials() {
		const bvh = this._bvh;

		if(bvh === null) {
			throw new Error('Body does not belong to a collision system');
		}

		return bvh.potentials(this);
	}

	/**
	 * Removes the body from its current collision system
	 */
	remove() {
		const bvh = this._bvh;

		if(bvh) {
			bvh.remove(this, false);
		}
	}

	/**
	 * Creates a {@link Result} used to collect the detailed results of a collision test
	 */
	createResult() {
		return new Result();
	}

	/**
	 * Creates a Result used to collect the detailed results of a collision test
	 */
	static createResult() {
		return new Result();
	}
};

// CONCATENATED MODULE: ./src/modules/Circle.mjs


/**
 * A circle used to detect collisions
 * @class
 */
class Circle_Circle extends Body_Body {
	/**
	 * @constructor
	 * @param {Number} [x = 0] The starting X coordinate
	 * @param {Number} [y = 0] The starting Y coordinate
	 * @param {Number} [radius = 0] The radius
	 * @param {Number} [scale = 1] The scale
	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
	 */
	constructor(x = 0, y = 0, radius = 0, scale = 1, padding = 0) {
		super(x, y, padding);

		/**
		 * @desc
		 * @type {Number}
		 */
		this.radius = radius;

		/**
		 * @desc
		 * @type {Number}
		 */
		this.scale = scale;
	}

	/**
	 * Draws the circle to a CanvasRenderingContext2D's current path
	 * @param {CanvasRenderingContext2D} context The context to add the arc to
	 */
	draw(context) {
		const x      = this.x;
		const y      = this.y;
		const radius = this.radius * this.scale;

		context.moveTo(x + radius, y);
		context.arc(x, y, radius, 0, Math.PI * 2);
	}
};

// CONCATENATED MODULE: ./src/modules/Polygon.mjs


/**
 * A polygon used to detect collisions
 * @class
 */
class Polygon_Polygon extends Body_Body {
	/**
	 * @constructor
	 * @param {Number} [x = 0] The starting X coordinate
	 * @param {Number} [y = 0] The starting Y coordinate
	 * @param {Array<Number[]>} [points = []] An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
	 * @param {Number} [angle = 0] The starting rotation in radians
	 * @param {Number} [scale_x = 1] The starting scale along the X axis
	 * @param {Number} [scale_y = 1] The starting scale long the Y axis
	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
	 */
	constructor(x = 0, y = 0, points = [], angle = 0, scale_x = 1, scale_y = 1, padding = 0) {
		super(x, y, padding);

		/**
		 * @desc The angle of the body in radians
		 * @type {Number}
		 */
		this.angle = angle;

		/**
		 * @desc The scale of the body along the X axis
		 * @type {Number}
		 */
		this.scale_x = scale_x;

		/**
		 * @desc The scale of the body along the Y axis
		 * @type {Number}
		 */
		this.scale_y = scale_y;


		/** @private */
		this._polygon = true;

		/** @private */
		this._x = x;

		/** @private */
		this._y = y;

		/** @private */
		this._angle = angle;

		/** @private */
		this._scale_x = scale_x;

		/** @private */
		this._scale_y = scale_y;

		/** @private */
		this._min_x = 0;

		/** @private */
		this._min_y = 0;

		/** @private */
		this._max_x = 0;

		/** @private */
		this._max_y = 0;

		/** @private */
		this._points = null;

		/** @private */
		this._coords = null;

		/** @private */
		this._edges = null;

		/** @private */
		this._normals = null;

		/** @private */
		this._dirty_coords = true;

		/** @private */
		this._dirty_normals = true;

		Polygon_Polygon.prototype.setPoints.call(this, points);
	}

	/**
	 * Draws the polygon to a CanvasRenderingContext2D's current path
	 * @param {CanvasRenderingContext2D} context The context to add the shape to
	 */
	draw(context) {
		if(
			this._dirty_coords ||
			this.x       !== this._x ||
			this.y       !== this._y ||
			this.angle   !== this._angle ||
			this.scale_x !== this._scale_x ||
			this.scale_y !== this._scale_y
		) {
			this._calculateCoords();
		}

		const coords = this._coords;

		if(coords.length === 2) {
			context.moveTo(coords[0], coords[1]);
			context.arc(coords[0], coords[1], 1, 0, Math.PI * 2);
		}
		else {
			context.moveTo(coords[0], coords[1]);

			for(let i = 2; i < coords.length; i += 2) {
				context.lineTo(coords[i], coords[i + 1]);
			}

			if(coords.length > 4) {
				context.lineTo(coords[0], coords[1]);
			}
		}
	}

	/**
	 * Sets the points making up the polygon. It's important to use this function when changing the polygon's shape to ensure internal data is also updated.
	 * @param {Array<Number[]>} new_points An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
	 */
	setPoints(new_points) {
		const count = new_points.length;

		this._points  = new Float64Array(count * 2);
		this._coords  = new Float64Array(count * 2);
		this._edges   = new Float64Array(count * 2);
		this._normals = new Float64Array(count * 2);

		const points = this._points;

		for(let i = 0, ix = 0, iy = 1; i < count; ++i, ix += 2, iy += 2) {
			const new_point = new_points[i];

			points[ix] = new_point[0];
			points[iy] = new_point[1];
		}

		this._dirty_coords = true;
	}

	/**
	 * Calculates and caches the polygon's world coordinates based on its points, angle, and scale
	 */
	_calculateCoords() {
		const x       = this.x;
		const y       = this.y;
		const angle   = this.angle;
		const scale_x = this.scale_x;
		const scale_y = this.scale_y;
		const points  = this._points;
		const coords  = this._coords;
		const count   = points.length;

		let min_x;
		let max_x;
		let min_y;
		let max_y;

		for(let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
			let coord_x = points[ix] * scale_x;
			let coord_y = points[iy] * scale_y;

			if(angle) {
				const cos   = Math.cos(angle);
				const sin   = Math.sin(angle);
				const tmp_x = coord_x;
				const tmp_y = coord_y;

				coord_x = tmp_x * cos - tmp_y * sin;
				coord_y = tmp_x * sin + tmp_y * cos;
			}

			coord_x += x;
			coord_y += y;

			coords[ix] = coord_x;
			coords[iy] = coord_y;

			if(ix === 0) {
				min_x = max_x = coord_x;
				min_y = max_y = coord_y;
			}
			else {
				if(coord_x < min_x) {
					min_x = coord_x;
				}
				else if(coord_x > max_x) {
					max_x = coord_x;
				}

				if(coord_y < min_y) {
					min_y = coord_y;
				}
				else if(coord_y > max_y) {
					max_y = coord_y;
				}
			}
		}

		this._x             = x;
		this._y             = y;
		this._angle         = angle;
		this._scale_x       = scale_x;
		this._scale_y       = scale_y;
		this._min_x         = min_x;
		this._min_y         = min_y;
		this._max_x         = max_x;
		this._max_y         = max_y;
		this._dirty_coords  = false;
		this._dirty_normals = true;
	}

	/**
	 * Calculates the normals and edges of the polygon's sides
	 */
	_calculateNormals() {
		const coords  = this._coords;
		const edges   = this._edges;
		const normals = this._normals;
		const count   = coords.length;

		for(let ix = 0, iy = 1; ix < count; ix += 2, iy += 2) {
			const next   = ix + 2 < count ? ix + 2 : 0;
			const x      = coords[next] - coords[ix];
			const y      = coords[next + 1] - coords[iy];
			const length = x || y ? Math.sqrt(x * x + y * y) : 0;

			edges[ix]   = x;
			edges[iy]   = y;
			normals[ix] = length ? y / length : 0;
			normals[iy] = length ? -x / length : 0;
		}

		this._dirty_normals = false;
	}
};

// CONCATENATED MODULE: ./src/modules/Point.mjs


/**
 * A point used to detect collisions
 * @class
 */
class Point_Point extends Polygon_Polygon {
	/**
	 * @constructor
	 * @param {Number} [x = 0] The starting X coordinate
	 * @param {Number} [y = 0] The starting Y coordinate
	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
	 */
	constructor(x = 0, y = 0, padding = 0) {
		super(x, y, [[0, 0]], 0, 1, 1, padding);

		/** @private */
		this._point = true;
	}
};

Point_Point.prototype.setPoints = undefined;

// CONCATENATED MODULE: ./src/Collisions.mjs







/**
 * A collision system used to track bodies in order to improve collision detection performance
 * @class
 */
class Collisions_Collisions {
	/**
	 * @constructor
	 */
	constructor() {
		/** @private */
		this._bvh = new BVH_BVH();
	}

	/**
	 * Creates a {@link Circle} and inserts it into the collision system
	 * @param {Number} [x = 0] The starting X coordinate
	 * @param {Number} [y = 0] The starting Y coordinate
	 * @param {Number} [radius = 0] The radius
	 * @param {Number} [scale = 1] The scale
	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
	 * @returns {Circle}
	 */
	createCircle(x = 0, y = 0, radius = 0, scale = 1, padding = 0) {
		const body = new Circle_Circle(x, y, radius, scale, padding);

		this._bvh.insert(body);

		return body;
	}

	/**
	 * Creates a {@link Polygon} and inserts it into the collision system
	 * @param {Number} [x = 0] The starting X coordinate
	 * @param {Number} [y = 0] The starting Y coordinate
	 * @param {Array<Number[]>} [points = []] An array of coordinate pairs making up the polygon - [[x1, y1], [x2, y2], ...]
	 * @param {Number} [angle = 0] The starting rotation in radians
	 * @param {Number} [scale_x = 1] The starting scale along the X axis
	 * @param {Number} [scale_y = 1] The starting scale long the Y axis
	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
	 * @returns {Polygon}
	 */
	createPolygon(x = 0, y = 0, points = [[0, 0]], angle = 0, scale_x = 1, scale_y = 1, padding = 0) {
		const body = new Polygon_Polygon(x, y, points, angle, scale_x, scale_y, padding);

		this._bvh.insert(body);

		return body;
	}

	/**
	 * Creates a {@link Point} and inserts it into the collision system
	 * @param {Number} [x = 0] The starting X coordinate
	 * @param {Number} [y = 0] The starting Y coordinate
	 * @param {Number} [padding = 0] The amount to pad the bounding volume when testing for potential collisions
	 * @returns {Point}
	 */
	createPoint(x = 0, y = 0, padding = 0) {
		const body = new Point_Point(x, y, padding);

		this._bvh.insert(body);

		return body;
	}

	/**
	 * Creates a {@link Result} used to collect the detailed results of a collision test
	 */
	createResult() {
		return new Result();
	}

	/**
	 * Creates a Result used to collect the detailed results of a collision test
	 */
	static createResult() {
		return new Result();
	}

	/**
	 * Inserts bodies into the collision system
	 * @param {...Circle|...Polygon|...Point} bodies
	 */
	insert(...bodies) {
		for(const body of bodies) {
			this._bvh.insert(body, false);
		}

		return this;
	}

	/**
	 * Removes bodies from the collision system
	 * @param {...Circle|...Polygon|...Point} bodies
	 */
	remove(...bodies) {
		for(const body of bodies) {
			this._bvh.remove(body, false);
		}

		return this;
	}

	/**
	 * Updates the collision system. This should be called before any collisions are tested.
	 */
	update() {
		this._bvh.update();

		return this;
	}

	/**
	 * Draws the bodies within the system to a CanvasRenderingContext2D's current path
	 * @param {CanvasRenderingContext2D} context The context to draw to
	 */
	draw(context) {
		return this._bvh.draw(context);
	}

	/**
	 * Draws the system's BVH to a CanvasRenderingContext2D's current path. This is useful for testing out different padding values for bodies.
	 * @param {CanvasRenderingContext2D} context The context to draw to
	 */
	drawBVH(context) {
		return this._bvh.drawBVH(context);
	}

	/**
	 * Returns a list of potential collisions for a body
	 * @param {Circle|Polygon|Point} body The body to test for potential collisions against
	 * @returns {Array<Body>}
	 */
	potentials(body) {
		return this._bvh.potentials(body);
	}

	/**
	 * Determines if two bodies are colliding
	 * @param {Circle|Polygon|Point} target The target body to test against
	 * @param {Result} [result = null] A Result object on which to store information about the collision
	 * @param {Boolean} [aabb = true] Set to false to skip the AABB test (useful if you use your own potential collision heuristic)
	 * @returns {Boolean}
	 */
	collides(source, target, result = null, aabb = true) {
		return SAT(source, target, result, aabb);
	}
};




/***/ })
/******/ ]);