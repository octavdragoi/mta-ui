sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("it.tum.sap.ui.controller.Details", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf it.tum.sap.ui.view.Details
		 */
		onInit: function () {
			// var dataModel = new sap.ui.model.odata.ODataModel(
			// 	"models/GBI.xsodata");

			// // after that, we can bind the odata model the
			// // SalesOrders view, so controls within the view can use them
			// this.getView().setModel(dataModel);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf it.tum.sap.quality_inspection_fa.view.Details
		 */
		onBeforeRendering: function () {

		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf it.tum.sap.quality_inspection_fa.view.Details
		 */
		onAfterRendering: function () {

		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf it.tum.sap.quality_inspection_fa.view.Details
		 */
		onExit: function () {

		}

	});

});