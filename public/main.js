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

let dataPoints = [{
    label: 'php7',
    y: 0
  },
  {
    label: 'phyton',
    y: 0
  },
  {
    label: 'nodejs',
    y: 0
  },
  {
    label: 'ruby',
    y: 0
  },
];

const chartContainer = document.querySelector('#chartContainer');

if (chartContainer) {
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    theme: 'theme1',
    title: {
      text: 'Backend Result'
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