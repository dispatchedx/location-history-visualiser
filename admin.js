( function ( $, L ) {
    $('#dashboard').click(function(){
        window.location.href = "dashboard.php"
    })


    $('#apply').click(function () {
        //alert("click");
        let month = $('#month').children("option:selected").val();
        let toMonth = $('#to-month').children("option:selected").val();
        let year = $('#year').children("option:selected").val();
        let toYear = $('#to-year').children("option:selected").val();
        let day = $('#day').children("option:selected").val();
        let toDay = $('#to-day').children("option:selected").val();
        let hour = $('#hour').children("option:selected").val();
        let toHour = $('#to-hour').children("option:selected").val();

        let walking =  $('#walking:checked').val() ? 1:'';
        let running =  $('#running:checked').val() ?1:'';
        let in_vehicle =  $('#in-vehicle:checked').val() ? 1:'';
        let on_bicycle =  $('#on-bicycle:checked').val() ? 1:'';
        let still = $('#still:checked').val() ? 1:'';

      //arr=[latitude,longitude,activity.type,activity.timestamp];
        $.ajax({
            url: "admin/admin_get_location_data.php",
            type: "post",
            dataType: 'json',
            data: {
                "month": month,
                "toMonth": toMonth,
                "year": year,
                "toYear": toYear,
                "day":day,
                "toDay":toDay,
                "hour":hour,
                "toHour":toHour,
                "running":running,
                "walking":walking,
                "on_bicycle":on_bicycle,
                "in_vehicle":in_vehicle,
                "still":still,
            },
            success: function (response) {
                console.log(response)
                map=createMap();
                let all_activities = Object.keys(response).length;
                let latlngs = [];
                    for (i = 0; i < all_activities; i++) {
                        let latitude = parseFloat(response[i][0]);
                        let longitude = parseFloat(response[i][1]);
                        latlngs.push([latitude, longitude]);
                    }

                    createMap();

                    // initialize heat layer and add it to map
                    heatOptions = {
                        tileOpacity: 1,
                        heatOpacity: 1,
                        radius: 25,
                        blur: 25
                    }
                    heat = L.heatLayer([],heatOptions).addTo(map);
                    heat._latlngs = latlngs;
                    heat.redraw();
                    // Give map rounded edges :)
                    $('#admin-map').css('border-radius', '8px');

                },

            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });


    });
    $('#delete-data').click(function (){
        if (confirm('Are you sure you want to delete all database data?')) {
            // Save it!
            $.ajax({
                url: "admin/admin_delete_data.php",
                type: "post",
                dataType: 'text',
                success: function (response) {
                    console.log(response);

                },

                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        } else {
            // Do nothing!
            console.log('lolno');
        }
    });
    $('#export-data').click(function (){





        let month = $('#month').children("option:selected").val();
        let toMonth = $('#to-month').children("option:selected").val();
        let year = $('#year').children("option:selected").val();
        let toYear = $('#to-year').children("option:selected").val();
        let day = $('#day').children("option:selected").val();
        let toDay = $('#to-day').children("option:selected").val();
        let hour = $('#hour').children("option:selected").val();
        let toHour = $('#to-hour').children("option:selected").val();

        let walking =  $('#walking:checked').val() ? 1:'';
        let running =  $('#running:checked').val() ?1:'';
        let in_vehicle =  $('#in-vehicle:checked').val() ? 1:'';
        let on_bicycle =  $('#on-bicycle:checked').val() ? 1:'';
        let still = $('#still:checked').val() ? 1:'';

        var export_type = $("input[name='export-as']:checked").val();

        //arr=[latitude,longitude,activity.type,activity.timestamp];
        $.ajax({
            url: "admin/admin_option_get_location_data.php",
            type: "post",
            dataType: 'text',
            data: {
                "month": month,
                "toMonth": toMonth,
                "year": year,
                "toYear": toYear,
                "day":day,
                "toDay":toDay,
                "hour":hour,
                "toHour":toHour,
                "running":running,
                "walking":walking,
                "on_bicycle":on_bicycle,
                "in_vehicle":in_vehicle,
                "still":still,
                "export_type":export_type,
            },
            success: function (response) {
                alert(response);

            },

            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });

    });


    $("#CheckAll").click(function() {
        $("input[type=checkbox]").prop("checked", $(this).prop("checked"));
    });

    $("input[type=checkbox]").click(function() {
        if (!$(this).prop("checked")) {
            $("#selectAll").prop("checked", false);
        }
    });


    function createMap() {
        $("#admin-map").remove();
        $("<div id=\"admin\-map\" \"></div>").appendTo("#content-div");
        map = L.map('admin-map');
        // set map center to plateia vasileos gewrgiou
        map.setView([38.2462420, 21.7350847], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '<a href="https://openstreetmap.org">OpenStreetMap</a> contributors.',
            maxZoom: 18
        }).addTo(map);
        return map;
    }

}( jQuery, L ) );