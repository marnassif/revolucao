sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("revproj1.controller.Main", {
            onInit: function () {
                var ImageList = {
                    Images: [
                        {
                            title: "Google",
                            url: "https://www.google.com"
                        }
                    ]
                };
                    var ImageModel = new JSONModel(ImageList);
                    this.getView().setModel(ImageModel, "ModeloImagem");
            },
            onPressBuscar: function(){
                 //alert("começou a revolução do SAP Fiori!!"); 
                 var oInputBusca = this.byId("inpBusca");
                 var sQuery = oInputBusca.getValue();
                 //alert(sQuery);
                 $.ajax({
                    //cabeçalho
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
                    method: "GET",
                    async:true,
                    crossDomain:true,
                    jsonpCallback: "getJSON",
                    contentType: "application/json",
                    headers:  {
                        "X-RapidAPI-Key": "452500f08cmsha5d44ef2d19ede5p1b8bd6jsn7db024eca63d",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    },
                    //corpo
                    data: {
                        "q": sQuery,
                        "pageNumber": 1,
                        "pageSize": 30,
                        "autoCorrect": true,
                        "safeSearch": true
                    },
                    //sucesso
                    success: function(data, textStatus){
                        var oImageModel = this.getView().getModel("ModeloImagem");
                        var oDadosImage = oImageModel.getData();

                        oDadosImage = {
                            Images: []
                        };
                        oImageModel.setData(oDadosImage);
                        //debugger

                        var listaResultados = data.value;
                        var newItem;

                        for(var i=0; i < listaResultados.length; i++ ){
                            newItem = listaResultados[i];
                            oDadosImage.Images.push(newItem);
                        };
                        oImageModel.refresh();

                    }.bind(this),
                    //erro
                    error: function(){

                    }.bind(this)

                 }); //fim  $.ajax
                }
        });
    });
