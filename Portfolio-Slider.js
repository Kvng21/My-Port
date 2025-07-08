document.addEventListener("DOMContentLoaded", () => { 
    
    const slider = document.getElementById('slider');
    const nextDom = document.querySelectorAll('.next'); 
    const prevDom = document.querySelectorAll('.prev');

    let sliderInterval;
    let justloaded = true;
    let lastTimeClicked;
    lastTimeClicked = Date.now(); // Initialize last clicked time to current time
    
    nextDom.forEach((next) => {
        next.onclick = function() {
            
            setTimeout(() => {  
                Sliderfunc('next');
            }, 20);
            
            clearInterval(sliderInterval);
            lastTimeClicked = Date.now(); // Set click to current time to indicate slider has been clicked
            
        }
    });
    
    prevDom.forEach((prev) => {
        
        prev.onclick = function() {
            
            setTimeout(() => { 
                Sliderfunc('prev');
            }, 200);
            
            clearInterval(sliderInterval);
            lastTimeClicked = Date.now();
        }
    });    
    
    
    
    const Sliderfunc = (type) =>{ 
        
        const list = document.querySelectorAll('.list');
    
        
        if(type === 'next'){
            const itemWidth = slider.clientWidth;
            
            slider.scrollTo({
                left: itemWidth,
                behavior: 'smooth'
            });
            
                
            slider.appendChild(list[0]); // move first item to end
            slider.scrollLeft = 0; // reset scroll position
                
            const updatedCurrentList = document.querySelector('.list:first-child');
            const sliderwrapper = updatedCurrentList.querySelector('.slider-wrapper');
        
            sliderwrapper.classList.remove('slider-wrapper-Ani');
            sliderwrapper.classList.remove('slider-wrapper-Ani-Pro');

            void sliderwrapper.offsetWidth; // trigger reflow to reset animation
            sliderwrapper.classList.add('slider-wrapper-Ani-Pro');
                // Re-select currentList after DOM mutation


                sliderImgAndAnimation(true); // update min-images navigation

            
        }
        else if(type === 'prev'){
            
            let Itemlastposition = list.length - 1;  
            slider.prepend(list[Itemlastposition]);
            slider.scrollLeft = 0;// reset scroll position
            
            setTimeout(() => {
                slider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });

                sliderImgAndAnimation(true); // update min-images navigation

            }, 100); 
        }
        

    }
    

    const startSlider = () => {
        justloaded = false; // Set click to 1 to indicate slider has been clicked
        sliderInterval = setInterval(() =>{
            Sliderfunc('next')
        }, 6000)
        
    };
    //To stop the slider from auto-sliding when the page is loaded
    justloaded === true ? setTimeout(() => {startSlider()}, 5000) : startSlider(); // Start auto-slide after 4 seconds if not clicked
    


    setInterval(() => {
    
        let currentTime = Date.now();
        let timeDuration =100000; // Set a 2mins duration to wait before resuming auto-slide
        
        if(currentTime - lastTimeClicked >= timeDuration) {
            clearInterval(sliderInterval); // Clear the interval to stop auto-slide
            startSlider(); // Restart the slider after 2 minutes of inactivity
        }
        
        
    }, 8000);// Check every 7 seconds if the slider should resume auto-slide
    
    

    function sliderImgAndAnimation(newslide){
        const currentList = document.querySelector('.list:first-child');
        if (!currentList) return; // Ensure it exists
        
        const sliderwrapper = currentList.querySelector('.slider-wrapper')
        const imgNav = currentList.querySelectorAll('.img-nav');
        const slideritem = currentList.querySelectorAll('.slider-item');
        const projectText = document.querySelectorAll('.project-text');
        const projectlist = document.querySelectorAll('.project-text ul li');
        const ImgNav = document.querySelectorAll('.ver-img-nav .img-nav');

        
        if (!sliderwrapper || slideritem.length === 0 || imgNav.length === 0) return;
        
    
        
        
        let active = 0;
        
        if(newslide === true || active === 0){
            if(newslide === true){ 
                imgNav[1].style.opacity = 0.6 
                imgNav[2].style.opacity = 0.6; // Set previous active image opacity to 0.6
            }
            
            active = 0; // Reset active index to 0
            imgNav[active].style.opacity = 0.9;
            
        }
        
        
        imgNav.forEach((img, index) => {
            
            
            img.onclick = function() {
                
                clearInterval(sliderInterval);
                lastTimeClicked = Date.now(); // Update last clicked time
                resume = false; // Reset resume flag
                
                imgNav[active].style.opacity = 0.6;
                active = index;
                img.style.opacity = 0.9;
                
                const imgHeight = slideritem[0].offsetHeight; // Get height of a single slider item
                sliderwrapper.scrollTop = index * imgHeight; // Scroll vertically based on index
            }
            

        })


        if(newslide === true){
            

            
            projectText.forEach(text => {
                
                text.classList.remove('project-text-Ani');
                
                setTimeout(() => {
                    text.classList.add('project-text-Ani');
                }, 100);



            });
            
            
            projectlist.forEach((list, index) => {
                
                list.classList.remove('project-list-Ani');
                
                setTimeout(() => {
                    list.classList.add('project-list-Ani');
                },index * 100);
                
            });
            
            ImgNav.forEach((img, index) => {
                
                img.classList.remove('img-nav-Ani');
                
                setTimeout(() => {
                    img.classList.add('img-nav-Ani');
                },index * 100);
                
            },);

        }


    }
    sliderImgAndAnimation(false)

    const viewResponsiveWidth = () => {
        const bodyBanner = document.querySelectorAll('.body-banner-all');
        const line = document.querySelector('.line-banner');

        const observer = new IntersectionObserver((entries) => {
                
            entries.forEach(entry => {
                const el = entry.target;
                
                
                if (entry.isIntersecting) {
                    el.classList.add('body-banner-ani');
                    void el.offsetWidth; // Force reflow
                    el.classList.add('body-banner-ani');

                    
                    // Calculate visibility ratio up to 50% max
                    let ratio = Math.min(entry.intersectionRatio, 1);
                    let scale = 0.90 + ratio * 0.10;
                    let opacityLevel = 0.2 + ratio * 1;
            
                    el.style.transform = `scaleX(${scale})`;
                    el.style.opacity = opacityLevel;
                } else {
                    // Reset styles when element leaves viewport
                    el.style.transform = 'scaleX(0.9)';
                    el.style.opacity = '0.4';
                }

            });
            
        }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) /* 0.00 → 0.01 in 0.01 steps*/ });
        
        bodyBanner.forEach(Banner => {
            if (Banner) observer.observe(Banner);
        },);


        //second observer    
        setTimeout(() => {

            const observer2 = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
    
                    const el = entry.target;
                    
                    if (entry.isIntersecting) {
                        el.classList.add('body-banner-ani');
                        void el.offsetWidth; // Force reflow
                        el.classList.add('body-banner-ani');
                        
                        
                        // Calculate visibility ratio up to 50% max
                        let ratio = Math.min(entry.intersectionRatio, 1);
                        
                        // Convert ratio to percentage (0.0 to 1 → 0% to 100%)
                        let opacityLevel = 0.0 + ratio * 1;
                
                        el.style.opacity = opacityLevel;
                    } 
                    else {
                        // Reset styles when element leaves viewport
                        el.style.opacity = '0.4';
                    }
    
                });
                
            }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) /* 0.00 → 0.50 in 0.01 steps*/ });
            
                if (line) observer2.observe(line);

        }, 10000)
            //if () observer2.observe();    
    };
    
    viewResponsiveWidth();

});