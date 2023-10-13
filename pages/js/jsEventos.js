
 
$(document).ready(function () {
    console.log("test");
    $(".btn-create").click(function (e) {
        $("#modal").load('/Facturacion/Create');

    });

    $(".btn-details").click(function () {
        var codigo = $(this).attr("data-codigo");
        $("#modal").load("/Facturacion/Details/" + codigo);
    });

    $(".btn-edit").click(function () {
        var codigo = $(this).attr("data-codigo");
        $("#modal").load("/Facturacion/Edit/" + codigo);
    });

    $(".btn-delete").click(function () {
        var codigo = $(this).attr("data-codigo");
        $("#modal").load("/Facturacion/Delete/" + codigo);
    });

    $(".btbBuscarFecha").click(function () {
        var fIni = $('#fIni').val();
        var fFin = $('#fFin').val();
        var url = '/Consulta/Index?fIni=' + fIni +'&fFin=' + fFin;
        location.href = url;
    });

    $(function () {

        $(".input-group-btn .dropdown-menu li a").click(function () {

            var selText = $(this).html();
            $(this).parents('.input-group-btn').find('.btn-search').html(selText);

        });

    });

    //$('#productos').DataTable();

    $("#Guardar").click(function () {
        alert('Factura registrado con éxito');
    });
 

});


 

function calcular() {
    var c = $("#Cantidad").val();
    var p = $("#PrecioUitario").val();
    var m = (p * c);
    var igv = (m * 0.18);
    var t = (m + igv);
    $("#Monto").val(m);
    $("#Igv").val(igv);
    $("#Total").val(t);    
}



function RegistrarDocumentos() 
{
    var lugar = "";
    var listaABuscar = null;
    try 
    {

        ControlaError = false;
        lugar ="ANTES DE CARGA EXCEL";
        CargaExcel();

        lugar = "ANTES DE DESCARGAR EXCEL";
        //DescargaExcelResultados(listaABuscar);

        lugar ="LUEGO DE DESCARGAR EXCEL";
        return true;
    }
    catch(e)
    {
        ControlErroresScript(e,lugar);
    }
}

function DescargaExcelResultados(lista) 
{
    var parametros =
    {
        ListaABuscar: lista,
        TipoBusqueda: "VENTAS"
    };
    jsShowWindowLoad();
    $.ajax(
        {
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            url: rutaProyecto + "Home/GeneraExcel",
            data: JSON.stringify(parametros),
            success: function (data, status) 
            {
                window.location = rutaProyecto + 'Home/Descarga?fileGuid=' + data.FileGuid + '&filename=' + data.FileName;
                jsRemoveWindowLoad();
            }
            , error: ControlErroresAjax
        }
        );

}
    

function Limpiar() 
{
    document.getElementById("divDocumentosCargados").innerHTML = "";
    document.getElementById('lblNombreArchivo').value = "";
    $("#imgCargando").hide();
}



function MostrarNombreArchivo() 
{
    var lugar = "";
    try 
    {
        var nombreArchivo = "";
        var longitudCadena = 0;
        var longitudPath = 0;

        lugar = "OBTENIENDO NOMBRE ARCHIVO";
        nombreArchivo = document.getElementById('inpFile').value;

        lugar = "OBTENIENDO LONGITUD CADENA";
        longitudCadena = nombreArchivo.length;
        
        lugar = "OBTENIENDO LONGITUD PATH";
        longitudPath = nombreArchivo.lastIndexOf("\\");

        lugar = "OBTENIENDO NOMBRE ARCHIVO";
        nombreArchivo = nombreArchivo.substr(longitudPath + 1, longitudCadena - longitudPath);

        lugar = "ASIGNANDO NOMBRE ARCHIVO";
        document.getElementById('lblNombreArchivo').value = nombreArchivo;
    }
    catch (e) 
    {
        ControlErroresScript(e, lugar);
    }

}


function CancelarDetalle() 
{
    try 
    {
        $("#detalle-panel").fadeOut(1000).addClass("hidden");
        $("#principal-panel").fadeIn(1000).removeClass("hidden");
    }
    catch (e) {
        ControlaError(e);
    }
}