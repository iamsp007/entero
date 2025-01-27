<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
   <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('landing/images/apple-touch-icon.png') }}"/>
   <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('landing/images/favicon-32x32.png') }}"/>
   <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('landing/images/favicon-16x16.png') }}"/>
   <link rel="shortcut icon" href="{{ asset('landing/images/favicon.ico') }}" type="image/x-icon">
   <meta name="csrf-token" content="{{ csrf_token() }}">
   <title>The Gimbal</title>
   <link href="{{ asset('landing/css/owl.carousel.min.css') }}" rel="stylesheet" />
   <link href="{{ asset('landing/css/owl.theme.default.css') }}" rel="stylesheet" />
   <link href="{{ asset('landing/css/jquery.fancybox.min.css') }}" rel="stylesheet" />
   <link href="{{ asset('landing/css/aos.css') }}" rel="stylesheet" />
   <link href="{{ asset('landing/css/style.css') }}" rel="stylesheet" />
</head>
<body>
   <!-----| Header |----->
   <header>
      <div class="logo" data-aos="fade-right"><img src="{{ asset('landing/images/logo.svg') }}" alt="The Gimbal Logo"/></div>
      <div class="flex header-right">
         <ul class="flex navigation" data-aos="fade-left">
            <li><a href="#weServe">WE SERVE</a></li>
            <li><a href="#products">PRODUCTS</a></li>
            <li><a href="#innovation">INNOVATION</a></li>
            <li><a href="#mission">MISSION</a></li>
            <li><a href="#ourClients">OUR CLIENTS</a></li>
            <li><a href="#knowMore">KNOW MORE</a></li>
            <!--<li><a href="#testimonials">TESTIMONIALS</a></li>-->
         </ul>
         <a class="btn" data-popup-open="popup-1" data-aos="fade-left" data-aos-delay="100">Schedule Demo</a>
         <a class="btn" href="{{ url('/login') }}" data-aos="fade-left" data-aos-delay="200">Client Login</a>
      </div>
   </header>

   <!-----| Banner |----->
   <div class="banner-container">
      <div class="container" data-aos="flip-down">
         <h1>Step to 100% <br/>Paperless <br/>Operation</h1>
      </div>
   </div>

   <!-----| We Serve Section |----->
   <section id="weServe" class="content-section">
      <h1 class="title" data-aos="zoom-in"><span>We Serve</span></h1>
      <div class="container">
         <div class="flex we-serve">
            <div>
               <figure data-aos="flip-left"><img src="{{ asset('landing/images/home-care-pic.svg') }}" alt="Home Care"/></figure>
               <h2 data-aos="fade-up" data-aos-delay="100">Home Care</h2>
               <p data-aos="fade-up" data-aos-delay="200">Gimbal is an integrated system of different modules designed to support both experienced and fresher employees to understand their work flow. The software is based on Home Care departments, and you may take what you need to make it cost effective. Each module is designed to support the user's workflow by providing tips, shortcuts and notifications. This all helps reducing training time, increasing work efficiency and ultimately benefitting the company as a whole.<br/><br/>Gimbal allows you to work with patients while maintaining the current home care regime. We have developed a solution that blends into the work styles of your staff, and doesn't require additional time or effort from them.
               <!-- <a class="btn">Read More</a> -->
               </p>
            </div>
            <!-- <div>
               <figure></figure>
               <h2>Day Care</h2>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            </div> -->
            <div>
               <figure data-aos="flip-right"><img src="{{ asset('landing/images/case-management-pic.svg') }}" alt="Case Management"/></figure>
               <h2 data-aos="fade-up" data-aos-delay="100">Case Management</h2>
               <p data-aos="fade-up" data-aos-delay="200">Gimbal Software offers a suite of software for case management for agencies and individuals patient. Our overall mission is to make the case management so easy and less time consuming that each coordinator can pay enough time for the quality services of their patients. Our carefully designed modules help with each aspect of case management, from intake and assessment to scheduling, documentation and communication.</p>
            </div>
         </div>
      </div>
   </section>

   <!-----| We Serve Section |----->
   <section id="products" class="content-section">
      <h1 class="title" data-aos="zoom-in"><span>Products</span></h1>
      <div class="container">
         <div class="flex products">
            <div>
               <figure data-aos="flip-up"><img src="{{ asset('landing/images/remote-hiring-pic.svg') }}" alt="Remote Hiring"/></figure>
               <h2 data-aos="fade-up" data-aos-delay="100">Remote Hiring</h2>
               <p data-aos="fade-up" data-aos-delay="200">Get the right employee in a fraction of the time. The Gimbal remote hiring software allows you to hire the right candidate, while also allowing HR to orient your employee before he or she starts work. This streamlined process saves time and resources, and gets your new employee up to speed even faster than before.</p>
            </div>
            <div>
               <figure data-aos="flip-up"><img src="{{ asset('landing/images/referral-management-pic.svg') }}" alt="Referral Management"/></figure>
               <h2 data-aos="fade-up" data-aos-delay="100">Referral Management</h2>
               <p data-aos="fade-up" data-aos-delay="200">GIMBAL is a Referral Management System that tracks the source of referrals, tags appropriate marketers and guides intake to the process smoothly. Designed for Healthcare services such as Home Care, GIMBAL significantly reduces the need for paper based systems to manage referrals by automating the whole process of sending refferal letters, SMS alerts and booking appointments.</p>
            </div>
            <div>
               <figure data-aos="flip-up"><img src="{{ asset('landing/images/e-timesheer-pic.svg') }}" alt="E-timesheet"/></figure>
               <h2 data-aos="fade-up" data-aos-delay="100">E-timesheet</h2>
               <p data-aos="fade-up" data-aos-delay="200">e-timesheet is an innovative and paperless software which helps in storing attendance of staff/caregivers in care home, hospital or any other medical organization. e-timesheet stores the attendance, confirms missed attendance and email up to the administrator on time. It also has many other functions like document management, compliance checking and more.</p>
            </div>
         </div>
      </div>
   </section>

   <!-----| Innovation Section |----->
   <section id="innovation" class="content-section innovation">
      <h1 class="title" data-aos="zoom-in"><span>Innovation</span></h1>
      <div class="container grid">
         <div>
         <h2 data-aos="fade-right">Cloud Storage</h2>
            <div class="flex">
               <p data-aos="fade-right" data-aos-delay="200">Welcome to your home of work. The homecare world has been caught up in old-school ways, where software is the piece of code that makes work easy and other important documents are being managed and organized separately in paper form. Gimbal takes care of every aspect of operation, with a tendency towards zero use of paper. All documents on Gimbal are easily accessible and managed with more professional approaches in cloud.</p>
               <figure data-aos="fade-right" data-aos-delay="100"><img src="{{ asset('landing/images/cloud-storage-pic.svg') }}" alt="Cloud Storage Illustration"/></figure>
            </div>
         </div>
         <div>
            <h2 data-aos="fade-left">Analytics</h2>
            <div class="flex">
               <p data-aos="fade-left" data-aos-delay="200">The Gimbal software is a new way to measure your business's performance based on actual results and not estimates. The AI-powered analytical dashboard gives you robust information about how your organization is performing, how it was impacted by each of its actions, and the likely end result of any project or task.</p>
               <figure data-aos="fade-left" data-aos-delay="100"><img src="{{ asset('landing/images/analytics-pic.svg') }}" alt="Analytics Illustration"/></figure>
            </div>
         </div>
      </div>
   </section>

   <!-----| Mission Section |----->
   <section id="mission" class="content-section mission">
      <div class="container">
         <div class="left-content">
            <h1 class="title" data-aos="zoom-in"><span>Mission</span></h1>
            <p data-aos="fade-right" data-aos-delay="100">Gimbal software's mission is to build a product that seamlessly blends into an existing technology stack, without disturbing harmony of the current operation or changing any software or methodology.<br/><br/>
            Gimbal, a group of creative thinkers, has started to develop software products that help companies enhance the way they operate. We see the silos in workflow and experience the most software and try to bridge these gaps by providing innovative solutions.</p>
            <a class="btn" data-popup-open="popup-1" data-aos="fade-right" data-aos-delay="200">Schedule Demo</a>
         </div>
      </div>
   </section>

   <div class="polygon-bg">
      <!-----| Our Clients Section |----->
      <section id="ourClients" class="content-section ourClients">
         <h1 class="title" data-aos="zoom-in"><span>Our Clients</span></h1>
         <div class="ourClients-carousel-container">
         <div id="ourClients-carousel" class="owl-carousel owl-theme">
            <div class="item" data-aos="flip-left" data-aos-delay="100"><img src="{{ asset('landing/images/house-calls.png') }}" alt="HouseCalls Home Care"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="200"><img src="{{ asset('landing/images/cottage-home-care.png') }}" alt="Cottage Home Care"/></div>
            <!--<div class="item" data-aos="flip-left" data-aos-delay="300"><img src="{{ asset('landing/images/ultimate-care.png') }}" alt="Ultimate Home Health Care"/></div>-->
            <div class="item" data-aos="flip-left" data-aos-delay="400"><img src="{{ asset('landing/images/doral-health-wellness.png') }}" alt="Doral Health Wellness"/></div>
            <div class="item" data-aos="flip-left" data-aos-delay="500"><img src="{{ asset('landing/images/anchorhc.png') }}" alt="Anchor Health Home Care Services"/></div>
            <div class="item" data-aos="flip-left" data-aos-delay="600"><img src="{{ asset('landing/images/edison-logo.jpg') }}" alt="Edison Home Health Care"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="700"><img src="{{ asset('landing/images/dhcare-logo.jpg') }}" alt="DHCARE"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="800"><img src="{{ asset('landing/images/joy-full-home-care-logo.png') }}" alt="JoyFull Home Care"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="900"><img src="{{ asset('landing/images/pella-care-logo.png') }}" alt="Pella Care"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="1000"><img src="{{ asset('landing/images/direct-health-source-logo.jpg') }}" alt="Direct Health Source"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/immigrant-elder-home-care-logo.jpg') }}" alt="Immigrant Elder Home Care"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/attending-home-care-logo.png') }}" alt="Attending Home Care"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/human-care-logo.png') }}" alt="Human CareCare"/></div>         
            <div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/dada-home-care-logo.png') }}" alt="Dada Home Care"/></div>         
            <!--<div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/parent-care-logo-new.png') }}" alt="Parent Care"/></div>-->         
            <div id="ourClients-carousel" class="owl-carousel owl-theme">
               <div class="item"><img src="{{ asset('landing/images/house-calls.png') }}" alt="HouseCalls Home Care"/></div>
               <div class="item"><img src="{{ asset('landing/images/cottage-home-care.png') }}" alt="Cottage Home Care"/></div>
               <div class="item"><img src="{{ asset('landing/images/ultimate-care.png') }}" alt="Ultimate Home Health Care"/></div>
               <div class="item"><img src="{{ asset('landing/images/doral-health-wellness.png') }}" alt="Doral Health Wellness"/></div>
               <div class="item"><img src="{{ asset('landing/images/anchorhc.png') }}" alt="Anchor Health Home Care Services"/></div>
               <div class="item"><img src="{{ asset('landing/images/edison-logo.jpg') }}" alt="Edison Home Health Care"/></div>         
               <div class="item"><img src="{{ asset('landing/images/dhcare-logo.jpg') }}" alt="DHCARE"/></div>   
               <div class="item"><img src="{{ asset('landing/images/joy-full-home-care-logo.png') }}" alt="JoyFull Home Care"/></div>         
               <div class="item"><img src="{{ asset('landing/images/pella-care-logo.png') }}" alt="Pella Care"/></div>         
               <div class="item"><img src="{{ asset('landing/images/direct-Health-Source-Logo.jpg') }}" alt="Direct Health Source"/></div>         
               <div class="item"><img src="{{ asset('landing/images/immigrant-elder-home-care-logo.jpg') }}" alt="Immigrant Elder Home Care"/></div>
               <div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/attending-home-care-logo.png') }}" alt="Attending Home Care"/></div>         
               <div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/human-care-logo.png') }}" alt="Human CareCare"/></div>         
               <div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/dada-home-care-logo.png') }}" alt="Dada Home Care"/></div>         
               <div class="item" data-aos="flip-left" data-aos-delay="1100"><img src="{{ asset('landing/images/parent-care-logo-new.png') }}" alt="Parent Care"/></div>    
            </div>
         </div>
         
      </section>

      <!-----| Testimonials Section |----->
<!--      <section id="testimonials" class="content-section testimonials">
         <h1 class="title" data-aos="zoom-in"><span>Testimonials</span></h1>
         <div class="container" data-aos="zoom-in">
            <div id="testimonials-carousel" class="owl-carousel owl-theme">
               <div class="item">
                  <div class="flex">
                     <figure><img src="{{ asset('landing/images/pic-1.jpg') }}" alt="Pic-1"/></figure>
                     <div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <h3>Client Name<span>Founder, CEO</span></h3>
                     </div>
                  </div>
               </div>
               <div class="item">
                  <div class="flex">
                     <figure><img src="{{ asset('landing/images/pic-1.jpg') }}" alt="Pic-1"/></figure>
                     <div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <h3>Client Name<span>Founder, CEO</span></h3>
                     </div>
                  </div>
               </div>
               <div class="item">
                  <div class="flex">
                     <figure><img src="{{ asset('landing/images/pic-1.jpg') }}" alt="Pic-1"/></figure>
                     <div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <h3>Client Name<span>Founder, CEO</span></h3>
                     </div>
                  </div>
               </div>
               <div class="item">
                  <div class="flex">
                     <figure><img src="{{ asset('landing/images/pic-1.jpg') }}" alt="Pic-1"/></figure>
                     <div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <h3>Client Name<span>Founder, CEO</span></h3>
                     </div>
                  </div>
               </div>
               <div class="item">
                  <div class="flex">
                     <figure><img src="{{ asset('landing/images/pic-1.jpg') }}" alt="Pic-1"/></figure>
                     <div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <h3>Client Name<span>Founder, CEO</span></h3>
                     </div>
                  </div>
               </div>
             </div>
         </div>
      </section>-->
   </div>

   <!-----| Know More Section |----->
   <section id="knowMore" class="content-section">
      <div class="container know-more">
         <h1 class="title" data-aos="zoom-in"><span>Know More</span></h1>
         <ul class="video-gallery-container">
            <li data-aos="fade-up" data-aos-delay="100"><a data-fancybox="video-gallery" rel="videoGroup" data-width="640" data-height="360" href="{{ asset('landing/images/videos/Gimbal-1-HD.mp4') }}"><img src="{{ asset('landing/images/video-thumb1.jpg') }}" alt="Video-1"/><span>Remote Hiring</span></a></li>

            <li data-aos="fade-up" data-aos-delay="200"><a data-fancybox="video-gallery" rel="videoGroup" data-width="640" data-height="360" href="{{ asset('landing/images/videos/Gimbal-2-HD.mp4') }}"><img src="{{ asset('landing/images/video-thumb2.jpg') }}" alt="Video-2"/><span>Hiring Caregivers</span></a></li>

            <li data-aos="fade-up" data-aos-delay="300"><a data-fancybox="video-gallery" rel="videoGroup" data-width="640" data-height="360" href="{{ asset('landing/images/videos/Timesheet-1-HD.mp4') }}"><img src="{{ asset('landing/images/video-thumb3.jpg') }}" alt="Video-3"/><span>Timesheet Pro</span></a></li>

            <li data-aos="fade-up" data-aos-delay="400"><a data-fancybox="video-gallery" rel="videoGroup" data-width="640" data-height="360" href="{{ asset('landing/images/videos/Timesheet-2-HD.mp4') }}"><img src="{{ asset('landing/images/video-thumb4.jpg') }}" alt="Video-4"/><span>Paperless Timesheet</span></a></li>       
         </ul> 
      </div>
   </section>

   <!-----| Paperless |----->
   <div class="paperless">
      <h1 data-aos="fade-up" data-aos-duration="1000">Step to 100% paperless operation</h1>
      <a data-aos="flip-left" data-aos-duration="2000"class="btn" data-popup-open="popup-1">Schedule Demo</a>
   </div>

   <!-----| Footer |----->
   <footer>
      <div class="container">
         <div class="flex">
            <div>
               <div class="logo" data-aos="fade-right"><img src="{{ asset('landing/images/logo.svg') }}" alt="The Gimbal Logo"/></div>
               <div class="social-icons">
                  <a href="https://www.linkedin.com/company/gimbalapplication" target="_blank" data-aos="fade-right" data-aos-delay="100"><img src="https://thegimbal.net/email-template/linkedIn.svg" alt="LinkedIn"/></a>
                  <a href="https://www.facebook.com/gimbalapplication/" target="_blank"  data-aos="fade-right" data-aos-delay="300"><img src="https://thegimbal.net/email-template/facebook.svg" alt="LinkedIn"/></a>
                  <a href="https://www.instagram.com/gimbalapplication/" target="_blank"  data-aos="fade-right" data-aos-delay="400"><img src="https://thegimbal.net/email-template/instagram.svg" alt="LinkedIn"/></a>
                  <a href="https://twitter.com/Gimbal_app?t=kSdSaKKGEPc0mXT_gHdpQw&s=09" target="_blank" data-aos="fade-right" data-aos-delay="500"><img src="https://thegimbal.net/email-template/twitter.svg" alt="Twitter"/></a>
                  <a href="https://www.youtube.com/channel/UCYKEfqUJiv7qUixYTp9iaig" target="_blank" data-aos="fade-right" data-aos-delay="600"><img src="https://thegimbal.net/email-template/youtube.svg" alt="YouTube"/></a>
               </div>
               <a href="{{url('privacy-policy')}}" class="privacy-policy-btn" data-aos="fade-left" data-aos-delay="100">Privacy Policy</a>
            </div>
            <div class="contact-details">
               <p data-aos="fade-left" data-aos-delay="100"><span>Address</span> 833 Meadow Road, Smithtown, NY, 11797</p>
               <p data-aos="fade-left" data-aos-delay="200"><span>Email ID</span> <a href="mailto:contact@hcbspro.com">contact@hcbspro.com</a></p>
               <p data-aos="fade-left" data-aos-delay="300"><span>Tel.</span> <a href="tel:+15162999600">+1(516)299-9600</a></p>
            </div>
         </div>
         <div class="copyright" data-aos="fade-up" data-aos-delay="100">©<span id="year"></span> The Gimbal. All Rights Reserved.</div>
      </div>
   </footer>


   <!-----| Schedule Demo Form |----->
   <div class="popup" data-popup="popup-1">
      <div class="popup-inner">
         <a class="popup-close" data-popup-close="popup-1"><img src="{{ asset('landing/images/close.svg') }}" alt="Close"/></a>
         <div class="schedule-demo-form">
            <h2>Schedule Demo</h2>
            <ul>
               <li>
                  <label>Company Name</label>
                  <input type="text" name="company_name" id="company_name" onkeypress="remove_error(this.id)" value="" />
               </li>
               <li>
                  <label>Full Name</label>
                  <input type="text" name="full_name" id="full_name" onkeypress="remove_error(this.id)" value=""/>
               </li>
               <li>
                  <label>Phone</label>
                  <input type="text" name="phone" id="phone" onkeypress="remove_error(this.id)" value=""/>
               </li>
               <li>
                  <label>Email</label>
                  <input type="email" name="email" id="email" value=""/>
               </li>
               <li>
                  <label>Best time to reach</label>
                  <input type="text" name="besttime" id="bestTime" value=""/>
               </li>
            </ul>
            <a class="btn" href="javascript:;" id="schedule-demo-btn">Submit</a>
         </div>
         <div class="thank-you">
            <h2>Thank You</h2>
            <p>We'll be in touch with you shortly</p>
         </div>
      </div>
   </div>

   <!-----| Privacy Policy Popup |
   <div class="popup" data-popup="privacy-policy-popup">
      <div class="popup-inner privacy-policy">
         <a class="popup-close" data-popup-close="privacy-policy-popup"><img src="{{ asset('landing/images/close.svg') }}" alt="Close"/></a>
         <div class="content">
            <h2>Privacy Policy</h2>
            <p>This privacy notice for HCBS PRO LLC ("Company," " we," "us," or "our" ), describes how and why we might collect, store, use, and/or share ("process ") your information when you use our services ("Services" ), such as when you: Visit our website at https://hcbspro.com , or any website of ours that links to this privacy notice Download and use our mobile application ( The Gimbal) , or any other application of ours that links to this privacy notice Engage with us in other related ways, including any sales, marketing, or events Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at contact@hcbspro.com.</p>
         </div>
     </div>
   </div>----->



   <script type="text/javascript" src="{{ asset('landing/js/jquery.min.js') }}"></script>
   <script type="text/javascript" src="{{ asset('landing/js/jquery-ui.min.js') }}"></script>
   <script type="text/javascript" src="{{ asset('landing/js/owl.carousel.js') }}"></script>
   <script type="text/javascript" src="{{ asset('landing/js/jquery.inputmask.bundle.js') }}"></script>
   <script type="text/javascript" src="{{ asset('landing/js/jquery.fancybox.min.js') }}"></script>
   <script type="text/javascript" src="{{ asset('landing/js/aos.js') }}"></script>
   <script type="text/javascript" src="{{ asset('landing/js/script.js') }}"></script>
   <script type="text/javascript" >
      var baseUrl = '{{ url("/") }}';
      AOS.init({
         duration: 1000,
         once: true,
      });
      var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
      var is_safari = navigator.userAgent.indexOf("Safari") > -1;

      function isSafariBrowser(){
         if (is_safari){
            if (is_chrome){  // Chrome seems to have both Chrome and Safari userAgents
               return false;
            } else {
               var link = document.createElement("link");
               link.rel = "stylesheet";
               link.href = "{{ asset('landing/css/safari.css') }}";
               document.head.appendChild(link);
               return true;
            }
         }
         return false;
      }

      isSafariBrowser();
   </script>
</body>
</html>