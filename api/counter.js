<script>
        // Secret Triple-Click Feature for "About Me" navbar trigger
    const secretTrigger = document.getElementById('secret-trigger');
    const secretSection = document.getElementById('secret-section');
    let clickCount = 0;
    let clickTimer = null;

        secretTrigger.addEventListener('click', (e) => {
        e.preventDefault();
    clickCount++;
    if (clickTimer) clearTimeout(clickTimer);
    if (clickCount === 3) {
                if (secretSection.style.display === 'none') {
        secretSection.style.display = 'block';
    secretSection.scrollIntoView({behavior: 'smooth' });
                } else {
        secretSection.style.display = 'none';
                }
    clickCount = 0;
            } else {
        clickTimer = setTimeout(() => { clickCount = 0; }, 500);
            }
        });

        window.addEventListener('DOMContentLoaded', () => {
            const reveals = document.querySelectorAll('.reveal');

            const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
            }, {
        threshold: 0.15
            });

            reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
            });

    // Admin ဖြစ်မှသာ Visitor Counter ကို ပြသရန်
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';
    const visitorCounterElement = document.getElementById('visitor-count');

    if (isAdmin) {
        visitorCounterElement.style.display = 'flex';
            }
        });
</script>