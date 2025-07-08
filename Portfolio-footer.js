document.addEventListener("DOMContentLoaded", () => {    

    const footerSwap = () => {
        const contactLink = document.getElementById('contact-nav-Text');
        const skillLink = document.getElementById('skill-nav-Text');
        const contactNav = document.querySelector('.contact-nav-container');
        const footer = document.querySelector('footer');
        const lastContainer = document.querySelector('#last-container');
        

        let type = 'new';
        
        if(type === 'new'){
            contactNav.classList.add('nav-change');

            lastContainer.style.marginTop = '2rem';

        }
    
        contactLink.onclick = function() { 
            type = 'contact';
            linkswap(type);
        }
    
        skillLink.onclick = function() {
            type = 'skill';
            linkswap(type);
        }
        


        const linkswap = (type) => {
            const contactBody = document.getElementById('contact-container');
            const skillbody = document.getElementById('skill-container');
            const skillNav = document.querySelector('.skill-nav-container');
            const form = document.querySelector('#contact-banner');
            
            if(type === 'contact'){
                contactBody.style.display = 'flex';
                skillbody.style.display = 'none'; 
                
                lastContainer.style.marginTop = '15rem';
    
                contactNav.classList.remove('nav-change');
                skillNav.classList.add('nav-change');

                form.classList.remove('contact-banner-Ani');
                form.classList.add('contact-banner-Ani');
            }
            else if(type === 'skill'){
                contactBody.style.display = 'none';
                skillbody.style.display = 'block'; 
    
                lastContainer.style.marginTop = '2rem';

                skillNav.classList.remove('nav-change');
                contactNav.classList.add('nav-change');
            }
            
        }
        
    }
    
    footerSwap();


    const viewResponsiveWidth = () => {
        const skillHeader = document.querySelectorAll('.skill-header');
        const skillTextVid = document.querySelectorAll('.skill-list-text');
        const familiarList = document.querySelectorAll('.fam-list');

        const observer = new IntersectionObserver((entries) => {
                
            entries.forEach(entry => {
                const el = entry.target;
                
                
                if (entry.isIntersecting) {
                    el.classList.add('skill-Ani');
                    void el.offsetWidth; // Force reflow
                    el.classList.add('skill-Ani');

                    
                    let ratio = Math.min(entry.intersectionRatio, 1);
                    let opacityLevel = 0 + ratio * 1;
            
                    el.style.opacity = opacityLevel;
                } else {
                    setTimeout(() => {
                            el.classList.remove('skill-Ani');
                    },500)
                    // Reset styles when element leaves viewport
                    el.style.opacity = '0.3';
                }

            });
            
        }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }); // 0.00 → 1.00 in 0.01 steps
        
        skillHeader.forEach(Header => {
            if (Header) observer.observe(Header);
        });
        
        skillTextVid.forEach(TextP => {
            if (TextP) observer.observe(TextP);
        });

        familiarList.forEach(List => {
            if (List) observer.observe(List);
        });

        
    }

    viewResponsiveWidth();

});