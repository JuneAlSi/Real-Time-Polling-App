const form = document.getElementById('vote-form');

// Form submit event
form.addEventListener('submit', e => {
  const choice = document.querySelector('input[name=backend]:checked').value;

  const data = {
    backend: choice
  };

  fetch('http://localhost:3000/poll', {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

  e.preventDefault();
});

fetch('http://localhost:3000/poll')
  .then(res => res.json())
  .then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;

    // Count voute points
    const voteCounts = votes.reduce(
      (acc, vote) =>
      ((acc[vote.backend] = (acc[vote.backend] || 0) + parseInt(vote.points)), acc), {});

    let dataPoints = [{
        label: 'php7',
        y: voteCounts.php7
      },
      {
        label: 'phyton',
        y: voteCounts.phyton
      },
      {
        label: 'nodejs',
        y: voteCounts.nodejs
      },
      {
        label: 'ruby',
        y: voteCounts.ruby
      },
    ];



    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
          text: `Total Votes ${totalVotes}`
        },
        data: [{
          type: 'column',
          dataPoints: dataPoints
        }]
      });

      chart.render();

      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher('145a71ef5c0836604ae5', {
        cluster: 'ap1',
        encrypted: true
      });

      var channel = pusher.subscribe('backend-poll');
      channel.bind('backend-vote', function (data) {
        dataPoints = dataPoints.map(x => {
          if (x.label == data.backend) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });

        chart.render();
      });


    }

  })