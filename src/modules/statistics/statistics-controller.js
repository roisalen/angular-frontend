(function() {
  function statisticsController( StatisticsFactory, $scope) {
    var vm = $scope;

         vm.getStatisticsByType = function(sortType, containerId, typeLabel, chartType) {
            StatisticsFactory.getStatistics(sortType, createPythonDate(vm.startDate), createPythonDate(vm.endDate))
            .success(function(data) {

               var extractedValues = extractValues(data);
               if (chartType === 'column') {
                  createColumnChart(extractedValues, containerId, typeLabel);
               } else if (chartType === 'pie') {
                  createPieCharts(extractedValues, containerId, typeLabel);
               }
               
            })
            .error(function() {
            console.log('Could not set subject title.');
         });;


         };
         
         var today = new Date();

         vm.startDate = ""+ today.getFullYear() + "-" + lpad(""+ (today.getMonth() + 1), "0", 2) + "-" + lpad(""+ today.getDate(), "0", 2);
         vm.endDate = ""+ today.getFullYear() + "-" + lpad(""+ (today.getMonth() + 1), "0", 2) + "-" + lpad(""+ (today.getDate()+1), "0", 2);


         

          
         vm.getStatistics = function() {
          vm.getStatisticsByType('sex', ['firstSexChartContainer', 'secondSexChartContainer'], 'Kjønn', 'pie');
          vm.getStatisticsByType('group', 'groupChartContainer', 'Fraksjon', 'column');
          vm.getStatisticsByType('name', 'nameChartContainer', 'Representant', 'column');
         }

         vm.getStatistics()

    
       
        
         return vm;
  }

  function createPythonDate(dateString) {
    var date = parseInt(dateString.slice(-2))
    var year = dateString.slice(0, 4)
    var month = parseInt(dateString.slice(5,-3))-1
    return lpad(""+date, "0", 2)+"-"+lpad(""+month, "0",2)+"-"+year
  }

  function lpad(str, padString, length) {
          while (str.length < length)
            str = padString + str;
          return str;
  }

  function createPieCharts(data, containerId, typeLabel) {
      new Highcharts.Chart({
         chart: {
            renderTo: containerId[0],
            type: 'pie'
         },
         title: {
               text: "Innlegg fordelt på " + typeLabel.toLowerCase()
         },


        series: [{
               name: "Antall",
                    colorByPoint: true,
                    data: data.idAndEntries
        }],
            

      });

      new Highcharts.Chart({
         chart: {
            renderTo: containerId[1],
            type: 'pie'
         },
         title: {
               text: "Replikker fordelt på " + typeLabel.toLowerCase()
         },


        series: [{
                    name: "Antall",
                    colorByPoint: true,
                    data: data.idAndReplies
        }],
            

      });

   }

   function createColumnChart(data, containerId, typeLabel) {
         new Highcharts.Chart({
            chart: {
               renderTo: containerId,
               type: 'column',
            },

            title: {
               text: "Innlegg og replikker fordelt på " + typeLabel.toLowerCase()
            },
            
            xAxis: {
               categories: data.ids,
               title: {
                  text: typeLabel
               }
            },
            
            yAxis: {
               allowDecimals: false,
               title: {
                  text: 'Antall'
               }
            },

            series: [{
               name: 'Innlegg',
               data: data.entries,
            },
            {
               name: 'Replikker',
               data: data.replies,
            }]
         });
   }

   function extractValues(data) {
         var entries = [];
         var ids = [];
         var replies = [];
         var idAndEntries = [], idAndReplies = [];
         for (var index in data) {
            var valueJson = data[index]
            if (valueJson._id) {
               ids.push(valueJson._id);
               entries.push(valueJson.mainEntries);
               replies.push(valueJson.replies);
               idAndEntries.push([valueJson._id, valueJson.mainEntries]);
               idAndReplies.push([valueJson._id, valueJson.replies])
            }
         }

         return {ids: ids, replies: replies, entries: entries, idAndReplies: idAndReplies, idAndEntries: idAndEntries};
   }

   angular
       .module('speakerAppControllers')
       .controller('statisticsController', statisticsController);

})();


