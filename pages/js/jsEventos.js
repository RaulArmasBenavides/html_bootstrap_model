$(document).ready(function () {

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
    //$("#Actualizar").click(function () {
    //    alert('Producto actualizado con éxito');
    //});
    //$("#Eliminar").click(function () {
    //    alert('Producto eliminado con éxito');
    //});
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


