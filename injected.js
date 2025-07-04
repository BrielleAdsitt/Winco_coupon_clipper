(function wincoAutoClipperWithConfirmation() {
    // Only run on /coupons root page
    if (!location.pathname.match(/^\/coupons\/?$/)) return;
  
    // Wait for page state to stabilize
    function initWhenReady() {
      const maxWait = 3000;
      const interval = 100;
      let waited = 0;
  
      const check = () => {
        const loginModalExists = document.querySelector('credentials-modal.login');
        const couponButtonsExist = document.querySelector('button.coupon__button--clip');
  
        if (loginModalExists) {
          console.warn('⚠️ Sign-in modal detected. Skipping coupon clipping.');
          return;
        }
  
        if (couponButtonsExist || waited >= maxWait) {
          startClipper();
        } else {
          waited += interval;
          setTimeout(check, interval);
        }
      };
  
      check();
    }
  
    // Starts after confirming user is signed in and coupons are visible
    function startClipper() {
      // --- Create and show confirmation popup ---
      function createConfirmationPopup() {
        const style = document.createElement('style');
        style.textContent = `
          #clipper-confirm-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
          }
          #clipper-confirm-box {
            background: white;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.25);
            max-width: 320px;
            font-family: Arial, sans-serif;
            text-align: center;
          }
          #clipper-confirm-box p {
            margin-bottom: 20px;
            font-size: 18px;
          }
          #clipper-confirm-box button {
            margin: 0 10px;
            padding: 8px 16px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          #clipper-confirm-yes {
            background-color: #28a745;
            color: white;
          }
          #clipper-confirm-no {
            background-color: #dc3545;
            color: white;
          }
        `;
        document.head.appendChild(style);
  
        const overlay = document.createElement('div');
        overlay.id = 'clipper-confirm-overlay';
  
        const box = document.createElement('div');
        box.id = 'clipper-confirm-box';
        box.innerHTML = `
          <p>Do you want to clip all coupons now?</p>
          <button id="clipper-confirm-yes">Yes</button>
          <button id="clipper-confirm-no">No</button>
        `;
        overlay.appendChild(box);
        document.body.appendChild(overlay);
  
        return overlay;
      }
  
      // --- Coupon clipping logic ---
      function clipCoupons() {
        console.log('🚀 Starting coupon clipping process...');
  
        // Set page size to 80 if needed
        const pageSizeDropdown = document.querySelector('select[id^="pagesize-selector"]');
        if (pageSizeDropdown && pageSizeDropdown.value !== "80") {
          pageSizeDropdown.value = "80";
          pageSizeDropdown.dispatchEvent(new Event("change", { bubbles: true }));
          console.log("📄 Page size set to 80");
          setTimeout(clipCoupons, 2000);
          return;
        }
  
        // Find and click all unclicked coupons
        const unclicked = Array.from(document.querySelectorAll('button.coupon__button--clip'))
          .filter(btn => btn.querySelector('.coupon__button-label')?.textContent.trim().toLowerCase() === 'clip coupon');
  
        if (unclicked.length > 0) {
          console.log(`✂️ Clipping ${unclicked.length} coupons...`);
          unclicked.forEach(btn => {
            try {
              btn.click();
            } catch (e) {
              console.warn('❌ Failed to click a coupon:', e);
            }
          });
          setTimeout(clipCoupons, 2000);
          return;
        }
  
        // If there's a next page, go to it
        const nextPageButton = document.querySelector('button.pagination-button.forward');
        if (nextPageButton && !nextPageButton.disabled) {
          console.log('➡️ Moving to next page...');
          nextPageButton.click();
          setTimeout(clipCoupons, 3000);
          return;
        }
  
        // All done
        console.log('✅ All coupons clipped or no more pages.');
      }
  
      // Show confirmation popup
      const popup = createConfirmationPopup();
      popup.querySelector('#clipper-confirm-yes').addEventListener('click', () => {
        popup.remove();
        clipCoupons();
      });
      popup.querySelector('#clipper-confirm-no').addEventListener('click', () => {
        popup.remove();
        console.log('🚫 Coupon clipping cancelled by user.');
      });
    }
  
    // Start after login check
    initWhenReady();
  })();
  