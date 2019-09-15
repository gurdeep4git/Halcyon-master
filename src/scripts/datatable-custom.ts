import "../sass/main.scss";
// This is page specific file.
import "../sass/datatable-custom.scss";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";

import "datatables.net-bs4";
import "datatables.net-colreorder-bs4";
import "datatables.net-rowreorder-bs4";
import "datatables.net-select-bs4";
import "datatables.net-fixedheader-bs4";

export class DataTableCustom{
    
    private table:DataTables.Api;

    constructor(){
        this.bindEvents();
    }

    private bindEvents(){
        $(document).ready(()=>this.InitTable());
        $("body").on('click', '#table1 tbody td.d-details-control .trigger', (e)=>this.toggleChildRow($(e.target)));
        //$("body").on( 'mouseenter', '#table1 tbody td', (e) => this.highLightColumns($(e.target)));
    }

    private InitTable(){
        this.table = $('#table1').DataTable( {
            "dom":"<<'float-left'f><'float-right'l><t><'float-left'i><'float-right'p>>",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "language": {
                //"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json",  //language change 
                "lengthMenu": "Display _MENU_ records per page",
                "zeroRecords": "Nothing found - sorry",
                "info": "Showing page _PAGE_ of _PAGES_",
                "infoEmpty": "No records available",
                "infoFiltered": "(filtered from _MAX_ total records)"
            },
            //@ts-ignore
            // "fixedHeader": {
            //     header: true,
            //     headerOffset: 50
            // },
            //"colReorder": true,
            // rowReorder:
            // {
            //     selector: 'td:first-child',
            //     update: true
            // },
            //"select": true,
            "stateSave": true,
            "scrollY": "400px",
            "scrollCollapse": true,
            "processing": true,
            "ajax": {
                "url": "https://randomuser.me/api/?results=200",
                "dataSrc": "results"
            },
            "columnDefs": [ 
                // {
                //     "targets": 0,
                //     "data": (row:any) => {
                //         return row.id.value === null?"-":row.id.value; 
                //     }
                // },
                {
                    "targets": 0,
                    "data": (row:any) => {
                        return row.name.first+" "+row.name.last;
                    }
                },
                {
                    "targets": 1,
                    "data":"gender",
                    "orderable": false,
                },
                {
                    "targets": 2,
                    "data":"email",
                    "orderable": false,
                },
                // {
                //     "targets": 4,
                //     "data":"login.username" 
                // },
                {
                    "targets": 3,
                    "data":"phone" ,
                    "orderable": false,
                },
                {
                    "targets": 4,
                    "data": (row:any) => {
                        return "<img src="+row.picture.thumbnail+">";
                    },
                    "orderable": false,
                },
                {
                    "targets":5, 
                    "className": 'd-details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '<a href="javascript:void(0)" class="trigger"></a>'
                },
            ]
        } );
    }

    private toggleChildRow(target:JQuery<HTMLElement>){
        var _this = $(target);
        var tr = _this.closest('tr');
        var row = this.table.row( tr );
    
        if ( row.child.isShown() ) {
            // This row is already open - close it
            $('div.slider', row.child()).slideUp( () => {
                row.child.hide();
                tr.removeClass('shown');

            } );
        }
        else {
            // Open this row
            row.child( this.format(row.data()), 'no-padding' ).show();
            tr.addClass('shown');

            $('div.slider', row.child()).slideDown();
        }
    }

    //@ts-ignore
    private format ( d ) {
        // `d` is the original data object for the row
        return '<div class="slider">'+
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;width:100%">'+
            '<tr>'+
                '<td colspan="2" style="background:#333;color:#FFF;text-align:center;">More Information</td>'+
            '</tr>'+ 
            '<tr>'+
                '<td>Full name</td>'+
                '<td>'+d.name.title+" "+d.name.first+" "+d.name.last+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Age</td>'+
                '<td>'+d.dob.age+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>City</td>'+
                '<td>'+d.location.city+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>State</td>'+
                '<td>'+d.location.state+'</td>'+
            '</tr>'+
        '</table>'+
    '</div>';
    }

    // private highLightColumns(target:JQuery<HTMLElement>){
    //     let _this = target;
    //     var colIdx = this.table.cell(_this).index().column;
    //     $( this.table.cells().nodes() ).removeClass( 'highlight' );
    //     $( this.table.column( colIdx ).nodes() ).addClass( 'highlight' );
    // }

}
new DataTableCustom();