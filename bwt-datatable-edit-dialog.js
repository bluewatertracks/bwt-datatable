import { PolymerElement, html } from '../@polymer/polymer';
import '../@polymer/paper-material/paper-material.js';
import '../@polymer/iron-form/iron-form.js';
import '../@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { IronResizableBehavior } from '../@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { mixinBehaviors } from '../@polymer/polymer/lib/legacy/class.js';
import { dom } from '../@polymer/polymer/lib/legacy/polymer.dom.js';

class PaperDatatableEditDialog extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
	static get template() {
		return html`
		<style is="custom-style" include="iron-flex iron-flex-alignment iron-positioning"></style>
			<style is="custom-style">
				:host{
					position: absolute;
					z-index: 10;
					display: none;
				}
				:host([visible]){
					display: block;
				}
				paper-material {
					position:absolute;
					left:0px;
					top:0px;
					right:0px;
					min-width: 100px;
					display: inline-block;
					padding: 4px 24px;
					background: var(--paper-datatable-edit-dialog-color, var(--paper-grey-50));
					border-radius: 2px;
					box-sizing: border-box;
					@apply --paper-datatable-edit-dialog;
				}
			</style>
		<paper-material id="material" elevation="1">
			<iron-form id="form">
				<form on-iron-form-presubmit="dismiss">
					<slot></slot>
				</form>
			</iron-form>
		</paper-material>
		`;
	}
	static get is() {
		return 'paper-datatable-edit-dialog';
	}

	static get properties() {
		return {
			positionedRelativeTo: {
				type: Element,
				observer: 'setLocationRelativeTo'
			},
			visible: {
				type: Boolean,
				reflectToAttribute: true
			}
		}
	}


	// listeners: {
	// 	'iron-resize': 'setLocationRelativeTo'
	// },

	ready() {
		super.ready();
		this.addEventListener('keyup', (ev) => {
			var genericEvent = ev;
			if (ev.keyCode == 13 && genericEvent.path[0].nodeName.toLowerCase() !== 'textarea') {
				this.dismiss();
			}
		});
		document.body.addEventListener('click', (ev) => {
			var path = ev.path;
			if (this.positionedRelativeTo && path.indexOf(this) == -1 && path.indexOf(this.positionedRelativeTo) == -1) {
				this.dismiss(ev);
			}
		});
	}

	dismiss(ev) {
		this.set('visible', undefined);
		this.positionedRelativeTo = undefined;
		if (ev)
			ev.preventDefault();
	}

	findFocus() {
		var paperInput = this.shadowRoot.querySelector('paper-input')
		if (paperInput) {
			paperInput.$.input.focus();
		}
		var paperInput = this.shadowRoot.querySelector('paper-textarea')
		if (paperInput) {
			var position = paperInput.$.input.$.textarea.value.length;
			paperInput.$.input.$.textarea.focus();
			paperInput.$.input.$.textarea.setSelectionRange(position, position);
		}
		var input = this.shadowRoot.querySelector('input')
		if (input) {
			input.focus();
		}
	}

	setLocationRelativeTo() {
		if (this.positionedRelativeTo) {
			this.set('visible', true)
			this.revealTime = Date.now();
			var relativeToParent = this.parentNode;
			while (relativeToParent !== window) {
				if (relativeToParent.nodeName == '#document-fragment') {
					relativeToParent = relativeToParent.host;
				} else {
					if (getComputedStyle(relativeToParent).position == 'relative' || getComputedStyle(relativeToParent).position == 'absolute') {
						break;
					}
					relativeToParent = dom(relativeToParent).parentNode;
				}
			}
			var parent = relativeToParent.getBoundingClientRect();
			var child = this.positionedRelativeTo.getBoundingClientRect();
			this.style.top = child.top - 2 - parent.top + "px";
			this.style.left = child.left - parent.left + "px";
			this.style.right = Math.max(parent.right - child.right, 0) + "px";
			this.$.material.style.minHeight = child.height + 2 + "px";
		}
	}
}
window.customElements.define(PaperDatatableEditDialog.is, PaperDatatableEditDialog);
