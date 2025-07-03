(function wincoAutoClipperWithConfirmation() {
    // --- Helper: Create and show confirmation popup ---
    function createConfirmationPopup() {
      // Styles for the modal
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
  
      // Overlay div
      const overlay = document.createElement('div');
      overlay.id = 'clipper-confirm-overlay';
  
      // Popup box div
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
  
    // --- Main clipping logic simplified (without retries) ---
    function clipCoupons() {
      console.log('Starting coupon clipping process...');
  
      const pageSizeDropdown = document.querySelector('select[id^="pagesize-selector"]');
      if (pageSizeDropdown && pageSizeDropdown.value !== "80") {
        pageSizeDropdown.value = "80";
        pageSizeDropdown.dispatchEvent(new Event("change", { bubbles: true }));
        console.log("Page size set to 80");
        setTimeout(clipCoupons, 2000);
        return;
      }
  
      const unclicked = Array.from(document.querySelectorAll('button.coupon__button--clip'))
        .filter(btn => btn.querySelector('.coupon__button-label')?.textContent.trim().toLowerCase() === 'clip coupon');
  
      if (unclicked.length > 0) {
        console.log(`Clipping ${unclicked.length} coupons...`);
        unclicked.forEach(btn => {
          try {
            btn.click();
          } catch (e) {
            console.warn('Failed to click coupon button:', e);
          }
        });
        setTimeout(clipCoupons, 2000);
        return;
      }
  
      const nextPageButton = document.querySelector('button.pagination-button.forward');
      if (nextPageButton && !nextPageButton.disabled) {
        console.log('Going to next page...');
        nextPageButton.click();
        setTimeout(clipCoupons, 3000);
        return;
      }
  
      console.log('All coupons clipped or no more pages.');
    }
  
    // --- Start by showing confirmation popup ---
    const popup = createConfirmationPopup();
  
    popup.querySelector('#clipper-confirm-yes').addEventListener('click', () => {
      popup.remove();
      clipCoupons();
    });
  
    popup.querySelector('#clipper-confirm-no').addEventListener('click', () => {
      popup.remove();
      console.log('Coupon clipping cancelled by user.');
    });
  })();
  