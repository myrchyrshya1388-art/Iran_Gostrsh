<script>
const ctx = document.getElementById('ordersChart');

if(ctx){
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [{
        label: 'Orders',
        data: [5, 12, 9, 20, 15, 30],
        borderWidth: 3,
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#2563eb' }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
</script>