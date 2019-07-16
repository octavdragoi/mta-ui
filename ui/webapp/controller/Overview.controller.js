sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {

	return Controller.extend("it.tum.sap.ui.controller.Overview", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf it.tum.sap.ui.view.Overview
		 */
		onInit: function () {

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf it.tum.sap.ui.view.Overview
		 */
		onBeforeRendering: function () {
			var view = this.getView();
			var model = view.getModel();
			model.read("/countDefectAll", {

				success: function (oData) {
					var dentCount = model.getObject("/countDefectAll('DENT')")["NumDefect"];
					var stainCount = model.getObject("/countDefectAll('FINE')")["NumDefect"];
					var scratchCount = model.getObject("/countDefectAll('SCRATCH')")["NumDefect"];
					var holeCount = model.getObject("/countDefectAll('HOLE')")["NumDefect"];
					var wrongObjectCount = model.getObject("/countDefectAll('WRONG_OBJECT')")["NumDefect"];
					var fineCount = model.getObject("/countDefectAll('FINE')")["NumDefect"];

					var defectPercentage = (dentCount + stainCount + scratchCount + holeCount + wrongObjectCount) * 100 / (dentCount + stainCount +
						scratchCount + holeCount + wrongObjectCount + fineCount);

					view.byId("percentage-chart").setPercentage(defectPercentage);
					
				}
			});
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf it.tum.sap.ui.view.Overview
		 */
		onAfterRendering: function () {}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf it.tum.sap.ui.view.Overview
		 */
		//	onExit: function() {
		//
		//	}

	});

});