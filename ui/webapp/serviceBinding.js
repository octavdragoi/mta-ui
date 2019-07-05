function initModel() {
	var sUrl = "/quality/odata/v2/ViewConsumerServices/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}