( function ( $, L ) {
    $('#go-back').click(function(){
        window.location.href = "admin.php"
    })
    $.ajax({
        url: "admin/admin_data.php",
        type: "get",
        dataType: 'json',
        success: function (response) {
            max_act=(response[0][1])
            step=Math.round(max_act/10);
            dataX = []
            start = 0;
            for(i=0;i<11;i++){
                if(i===10)
                    dataX.push(max_act)
                else {
                    dataX.push(start);
                    start += step;
                }
            }

            labelsX=[]; // example: ["0-5","5-10","10-15"]
            for(i=0;i<10;i++){
                labelsX.push(dataX[i]+"-"+dataX[i+1]);
            }

            chartX=[0,0,0,0,0,0,0,0,0,0] // a bunch of counters for users that have data
            for(i=0;i<response.length;i++){
                if(response[i][1]>dataX[0] && response[i][1]<=dataX[1])
                    chartX[0]++;
                if(response[i][1]>dataX[1] && response[i][1]<=dataX[2])
                    chartX[1]++;

                if(response[i][1]>dataX[2] && response[i][1]<=dataX[3])
                    chartX[2]++;

                if(response[i][1]>dataX[3] && response[i][1]<=dataX[4])
                    chartX[3]++;

                if(response[i][1]>dataX[4] && response[i][1]<=dataX[5])
                    chartX[4]++;

                if(response[i][1]>dataX[5] && response[i][1]<=dataX[6])
                    chartX[5]++;

                if(response[i][1]>dataX[6] && response[i][1]<=dataX[7])
                    chartX[6]++;

                if(response[i][1]>dataX[7] && response[i][1]<=dataX[8])
                    chartX[7]++;

                if(response[i][1]>dataX[8] && response[i][1]<=dataX[9])
                    chartX[8]++;
                if(response[i][1]>dataX[9] && response[i][1]<=dataX[10])
                    chartX[9]++;


            }


            var ctx = document.getElementById('chart-registries').getContext('2d');
            var myBarChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labelsX,
                    datasets: [{
                        label: "# users",
                        data: [chartX[0], chartX[1], chartX[2], chartX[3], chartX[4], chartX[5], chartX[6], chartX[7],
                            chartX[8], chartX[9]],
                        fill:false,
                        backgroundColor: "rgb(233, 246, 250)",
                        borderColor:"rgb(165, 193, 220)",
                        borderWidth:1,
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                reverse:false,
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    $.ajax({
        url: "admin/admin_activity_types.php",
        type: "get",
        dataType: "json",

        success: function (response) {

            dataX=[];
            labelsX=[];
            response[0][1]
            all=0;
            for(i=0;i<response.length;i++){
                all+=parseInt(response[i][1]);
            }
            for(i=0;i<response.length;i++){
                labelsX.push(response[i][0]);
                temp = response[i][1]/all;
                temp = (temp*100).toFixed(2)
                dataX.push(temp);
            }

            var ctx = document.getElementById('pie-basic').getContext('2d');
            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labelsX,
                    datasets: [{
                        data: dataX,
                        backgroundColor: [

                            'rgb(121, 130, 185)',
                            'rgb(165, 193, 220)',
                            'rgb(233, 246, 250)',
                            'rgb(95, 158, 160)',
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)'
                        ],
                    }],

                },
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "admin/admin_activity_years.php",
        type: "get",
        dataType: "json",

        success: function (response) {


            dataX=[];
            labelsX=[];
            //response[0][1]
            all=0;
            for(i=0;i<response.length;i++){
                all+=parseInt(response[i][1]);
            }
            for(i=0;i<response.length;i++){
                labelsX.push(response[i][0]);
                dataX.push(response[i][1]);
            }
            var ctx = document.getElementById('chart-years').getContext('2d');
            var myBarChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labelsX,
                    datasets: [{
                        label: "# registries for year",
                        data: dataX,
                        fill:true,
                        backgroundColor: "rgb(233, 246, 250)",
                        borderColor:"rgb(165, 193, 220)",
                        borderWidth:1,
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                reverse:false,
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "admin/admin_activity_months.php",
        type: "get",
        dataType: "json",


        success: function (response) {
            all=0;
            // registries = response[i][1];
            // month = response[i][0];
            for(i=0;i<response.length;i++){
                all+=parseInt(response[i][1]);
            }

            var dataX = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: [],
                8: [],
                9: [],
                10: [],
                11: [],

            }
            for(i=0;i<response.length;i++){
                registries = response[i][1];
                month = response[i][0];

                if(month==='01')
                    dataX[0]=registries;
                else if(month==='02')
                    dataX[1]=registries;
                else if(month==='03')
                    dataX[2]=registries;
                else if(month==='04')
                    dataX[3]=registries;
                else if(month==='05')
                    dataX[4]=registries;
                else if(month==='06')
                    dataX[5]=registries;
                else if(month==='07')
                    dataX[6]=registries;
                else if(month==='08')
                    dataX[7]=registries;
                else if(month==='09')
                    dataX[8]=registries;
                else if(month==='10')
                    dataX[9]=registries;
                else if(month==='11')
                    dataX[10]=registries;
                else if(month==='12')
                    dataX[11]=registries;
            }
            console.log(dataX)


            months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"]

            var ctx = document.getElementById('chart-months').getContext('2d');
            var myBarChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: "# registries for month",
                        data: dataX,
                        fill:true,
                        backgroundColor: "rgb(233, 246, 250)",
                        borderColor:"rgb(165, 193, 220)",
                        borderWidth:1,
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                reverse:false,
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "admin/admin_activity_hours.php",
        type: "get",
        dataType: "json",


        success: function (response) {
            console.log(response)
            dataX=[];
            labelsX=[];
            //response[0][1]
            all=0;
            for(i=0;i<response.length;i++){
                all+=parseInt(response[i][1]);
            }
            for(i=0;i<response.length;i++){
                labelsX.push(response[i][0]);
                dataX.push(response[i][1]);
            }
            var ctx = document.getElementById('chart-hours').getContext('2d');
            var myBarChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labelsX,
                    datasets: [{
                        label: "# registries for hour",
                        data: dataX,
                        fill:true,
                        backgroundColor: "rgb(233, 246, 250)",
                        borderColor:"rgb(165, 193, 220)",
                        borderWidth:1,
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                reverse:false,
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "admin/admin_activity_days.php",
        type: "get",
        dataType: "json",


        success: function (response) {
            console.log(response)
            dataX=[];
            labelsX=[];
            //response[0][1]
            all=0;
            for(i=0;i<response.length;i++){
                all+=parseInt(response[i][1]);
            }
            for(i=0;i<response.length;i++){
                labelsX.push(response[i][0]);
                dataX.push(response[i][1]);
            }
            var ctx = document.getElementById('chart-days').getContext('2d');
            var myBarChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labelsX,
                    datasets: [{
                        label: "# registries for day",
                        data: dataX,
                        fill:true,
                        backgroundColor: "rgb(233, 246, 250)",
                        borderColor:"rgb(165, 193, 220)",
                        borderWidth:1,
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                reverse:false,
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}( jQuery, L ) );