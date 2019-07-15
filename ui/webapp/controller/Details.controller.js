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
			// 	"/quality/odata/v2/ViewConsumerServices/");

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
			
			var model = this.getView().getModel();

			model.read("/Products",
			{
				urlParameters : {
					"$expand":"images, products_defects"
				}
			});
			
			model.read("/Defects",
			{
			
			});
			
			model.read("/Products_Defects",
			{
				urlParameters : {
					"$expand":"defects"
				}
			});
			var sorter = new sap.ui.model.Sorter("/productID", true);
			model.read("/ItemView",
			{
				sorter: [sorter]
			});
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf it.tum.sap.quality_inspection_fa.view.Details
		 */
		onAfterRendering: function () {
			//this.getView().byId("ProductsDefectsTable").setSelectedIndex(0);
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf it.tum.sap.quality_inspection_fa.view.Details
		 */
		onExit: function () {

		},

		onSelectChange: function (oControlEvent) {
			var context = oControlEvent.getParameter("rowContext");
			//the service url to image service
			var baseImageUrl = "https://" + "quality-assurance-image-service.cfapps.eu10.hana.ondemand.com?key=";

			var model = this.getView().getModel();
			
			//var itemId = this.getView().getModel().getProperty("ItemID", context);
			var productId = this.getView().getModel().getProperty("productID", context);
			//var defect = this.getView().getModel().getProperty("defect", context);
			var factory = this.getView().getModel().getProperty("factory", context);
			var date = this.getView().getModel().getProperty("date", context);
			
			console.log(model)
			
			var products = model.getObject("/Products("+productId+")")
			
			var imageId1 = model.getProperty("/"+products["images"]["__list"][0]+"/url");
			this.getView().byId("img1").setSrc(baseImageUrl + imageId1);
			var imageId2 = model.getProperty("/"+products["images"]["__list"][1]+"/url");
			this.getView().byId("img2").setSrc(baseImageUrl + imageId2);
			
			var products_defects = products["products_defects"]["__list"];
			
			var defect="";
			var noDefect="";
			for (var id in products_defects)
			{
				var defectId = model.getProperty("/"+products_defects[id]+"/defect_ID");
				var defectDescription = model.getProperty("/Defects("+defectId +")/description");
				
				if (defectDescription == "FINE"){
					noDefect = noDefect + defectDescription + " ";
				}
				else {
					defect = defect + defectDescription + " ";
				}
			}
			
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "EEE, d MMM yyyy HH:mm:ss zzzz" });   
			var dateFormatted = dateFormat.format(date);
			
			var displayTextDefect = "<h1> " + defect + "</h1><br>";
			var displayTextNoDefect = "<h1>" + noDefect + "</h1><br>";
			var displayTextOtherDetails = "<h2>Date : " + dateFormatted + "</h2><br>" + "<h2>Product ID : " + productId + "</h2><br>" + "<h3>Factory : " + factory +"</h3>";
			
			this.getView().byId("defect-lable").setHtmlText(displayTextDefect);
			this.getView().byId("no-defect-lable").setHtmlText(displayTextNoDefect);
			this.getView().byId("other-details-lable").setHtmlText(displayTextOtherDetails);
		}

	});

});