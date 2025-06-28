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



    const footerSwap = () => {
        const contactLink = document.getElementById('contact-nav-Text');
        const skillLink = document.getElementById('skill-nav-Text');
        const contactNav = document.querySelector('.contact-nav-container');
        let type = 'new';
        
        if(type === 'new'){
            contactNav.classList.add('nav-change');
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
    
            if(type === 'contact'){
                contactBody.style.display = 'flex';
                skillbody.style.display = 'none'; 
    
                contactNav.classList.remove('nav-change');
                skillNav.classList.add('nav-change');
            }
            else if(type === 'skill'){
                contactBody.style.display = 'none';
                skillbody.style.display = 'block'; 
    
    
                skillNav.classList.remove('nav-change');
                contactNav.classList.add('nav-change');
            }
            
        }
        
    }
    
    footerSwap();




});