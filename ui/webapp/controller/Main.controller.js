sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("it.tum.sap.ui.controller.Main", {
		onInit: function () {
			// first, we need to get the shell by its id, so we // can manipulate its content
			var shell = this.getView().byId("shell");
			// if there is not content displayed,
			// show the page of the first navigation item 
			if (shell.getContent().length === 0) {
				// first, we need to check if there any workitems // defined, otherwise we cannot load anything
				var worksetItems = shell.getWorksetItems();
				if (worksetItems.length > 0) {
					shell.setContent(
						this.getContent(worksetItems[0].getKey())
					);
				}
			}
		},

		itemSelected: function (oEvent) {
			// first, we have to get the key of the selected navigation item 
			var itemKey = oEvent.getParameter("key");
			// next, we need to get the shell to be able to manipulate it 
			var oShell = oEvent.getSource();
			// var oShell = this.getView().byId("shell");
			// next, we have to get the right page (content) for the key.
			// For convenience reasons, this is done in a different function 
			var content = this.getContent(itemKey);
			// last, we put the content that we retrieved to the content
			// section of the shell. the first argument for the function is // the content, the second one defines if we want to destroy old // content (if present) before adding the new content 
			oShell.setContent(content, true);
		},

		getContent: function (key) {
			var content = null;
			// because the application will have several pages, // we use the switch-case contruct to check the key 
			switch (key) {
			case "overview":
				// when the navigation item "overview" is selected, // we return the respective view
				content = sap.ui.view({
					viewName: "it.tum.sap.ui.view.Overview",
					// type of the view, i.e. XML, JavaScript, JSON... 
					type: sap.ui.core.mvc.ViewType.XML
				});
				break;
				// when the navigation item "overview" is selected, // we return the respective view
			case "details":
				// when the navigation item "overview" is selected, // we return the respective view
				content = sap.ui.view({
					viewName: "it.tum.sap.ui.view.Details",
					// type of the view, i.e. XML, JavaScript, JSON... 
					type: sap.ui.core.mvc.ViewType.XML
				});
				break;
			default:
				// when we get an item that we do not know,
				// we return nothing
				content = null;
				break;
			}
			return content;
		}
	});
});