//Window.onload is used to load the lines properly on the page load
document.addEventListener("DOMContentLoaded", () => {    

    setTimeout(() => {

        const headerBanner = document.getElementById('header-banner')
    
        function aboutAnimation(){    
            const navbar = document.querySelectorAll('.navbar-container');
            const aboutText = document.querySelectorAll('.about-text');
            const aboutimage = document.querySelectorAll('#about-me-image');
    
            headerBanner.addEventListener('animationend', () => {
                
                navbar.forEach((nav) => {
                    nav.classList.add('navbarAni'); //
                })
            
                aboutText.forEach((abt, index) => {
                    setTimeout(() => {
                        abt.classList.add('aboutTextAni');
                    },index * 100)// Each item gets a 1-second staggered delay
    
                })
    
    
                aboutimage.forEach((img) => {
                    img.classList.add('aboutImgAni');
                });
    
    
            })   
        }
    
        aboutAnimation()
    
    
        //For line and slider animation
        const lineSliderAnimation = () => {
            const lines = document.querySelectorAll('.lines');
            const projects = document.querySelector('#projects');
            const projectsHeaderText = document.querySelector('#projects-header-Text');
            const projectText = document.querySelectorAll('.project-text');
            const projectlist = document.querySelectorAll('.project-text ul li');
            const ImgNav = document.querySelectorAll('.ver-img-nav .img-nav');
            const sliderwrapper = document.querySelectorAll('.slider-wrapper');
            
            projects.classList.add('projectAni');
            
            projects.addEventListener('animationend', () => {
                
                sliderwrapper.forEach(wrapper => {      
                    wrapper.classList.add('slider-wrapper-Ani');
                });
                
                projectText.forEach(text => {
                    text.classList.add('project-text-Ani');
                });
                
                projectsHeaderText.classList.add('project-Header-Ani');
                
                projectlist.forEach((list, index) => {
                    
                    setTimeout(() => {
                        list.classList.add('project-list-Ani');
                    },index * 100);
                    
                });
                
                ImgNav.forEach(img => {
                    img.classList.add('img-nav-Ani');
                },);
                
                
            });
            
    
            setTimeout(() => {
                
                lines.forEach(line => {
                    line.classList.add('lineDisplay');  
                    line.classList.add('lineAni');
                    
                    line.addEventListener('animationend', () => {
                        projects.classList.add('projectlight');
                    }, {once: true});// Only fire once
    
                });        
            }, 3000);
    
    
        }
        
        lineSliderAnimation();
    }, 1000);

    
},)