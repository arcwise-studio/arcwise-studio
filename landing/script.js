// Simple reveal-on-scroll + small interactions
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  const reveals = document.querySelectorAll('.reveal, .hero__content, .hero__card, .services__grid article, .portfolio__grid article, .process__steps li');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  },{threshold:0.12});
  reveals.forEach(r=>{ r.classList.add('reveal'); io.observe(r); });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault(); const id=a.getAttribute('href'); document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
    });
  });

  // Form submit (demo) - show status
  const form = document.getElementById('auditForm');
  form?.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    document.getElementById('formStatus').textContent = 'Sending...';
    // simulate send
    setTimeout(()=>{ document.getElementById('formStatus').textContent = 'Thanks — we will email your audit in 48h.'; form.reset(); },1200);
  });
});
