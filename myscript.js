let app = angular.module('myapp', []);

app.controller('myctrl', ($scope, $http) => {
    // Controller code
    $scope.title = "STAY HOME STAY SAFE";
    console.log("app loaded");

    // Fetching data from API
    const URL = "https://api.rootnet.in/covid19-in/stats/latest";
    $http.get(URL).then((response) => {
        // Success
        console.log(response.data);
        $scope.all_data = response.data;
        $scope.unofficialsummary = response.data.data['unofficial-summary'][0];

        // Extracting data for chart
        let states = [];
        let totalConfirmed = [];

        $scope.all_data.data.regional.forEach(state => {
            states.push(state.loc);
            totalConfirmed.push(state.totalConfirmed);
        });
        //get c_data
        $scope.get_c_data = () => {
            let state = $scope.c;
            if (state === '') {
                return;
            }
            let stateDataURL = `${URL}?state=${state}`; 
            $http.get(stateDataURL)
                .then((response) => {
                    $scope.c_data = response.data.data.regional.find(item => item.loc.toLowerCase() == state.toLowerCase());
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        // Create chart
        createChart(states, totalConfirmed);
    }).catch((error) => {
        // Error handling
        console.log(error);
    });

    // Function to create chart
    function createChart(states, totalConfirmed) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: states,
                datasets: [{
                    label: 'Total Confirmed Cases',
                    data: totalConfirmed,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
