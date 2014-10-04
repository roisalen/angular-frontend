(function() {
  function statisticsController( StatisticsFactory) {
    var vm = this;

         vm.getStatisticsByType = function(sortType, containerId, typeLabel, chartType) {
            StatisticsFactory.getStatistics(sortType)
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

         vm.getStatisticsByType('sex', ['firstSexChartContainer', 'secondSexChartContainer'], 'Kjønn', 'pie');
         vm.getStatisticsByType('group', 'groupChartContainer', 'Fraksjon', 'column');
         vm.getStatisticsByType('name', 'nameChartContainer', 'Representant', 'column');

         return vm;
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


