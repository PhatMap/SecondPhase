import React, { useState, useRef } from 'react';

const ProductImageZoom = ({ image }) => {
  const [zooming, setZooming] = useState(false);
  const zoomLensRef = useRef(null);
  const zoomResultRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!zooming) return;

    const lens = zoomLensRef.current;
    const result = zoomResultRef.current;
    const img = imageRef.current;
    const { left, top, width, height } = img.getBoundingClientRect();

    // Calculate the position of the lens
    const lensX = e.clientX - left - lens.offsetWidth / 2;
    const lensY = e.clientY - top - lens.offsetHeight / 2;
    
    // Prevent the lens from being positioned outside the image
    const lensLeft = Math.max(0, Math.min(lensX, width - lens.offsetWidth));
    const lensTop = Math.max(0, Math.min(lensY, height - lens.offsetHeight));
    
    lens.style.left = lensLeft + 'px';
    lens.style.top = lensTop + 'px';
    

    // Calculate the ratio of the result div to the lens
    const ratio = result.offsetWidth / lens.offsetWidth;
    result.style.backgroundSize = `${width * ratio}px ${height * ratio}px`;
    result.style.height = `${height}px`;

    // Move the result's background image depending on the lens position
    result.style.backgroundPosition = `-${lensLeft * ratio}px -${lensTop * ratio}px`;
  };

  return (
    <div 
      onMouseMove={handleMouseMove} 
      onMouseEnter={() => setZooming(true)}
      onMouseLeave={() => setZooming(false)}
      style={{ position: 'relative' }}
    >
      <img 
        ref={imageRef}
        src={image} 
        alt="Zoomed Product" 
        style={{
            top:'5px',
            width: '400px',
            height: '500px',  
            display: 'block',
            marginBottom:'15px',
             
        }}
    />
    <div
        ref={zoomLensRef}
        style={{
            position: 'absolute',
            border: '1px solid #d4d4d4',
            width: '110px',
            height: '110px',
            display: zooming ? 'block' : 'none',
            cursor: 'none',
            
        }}
/>

        <div 
        ref={zoomResultRef}
        style={{
            marginLeft:"50px",
            position: 'absolute',
            border: '1px solid #d4d4d4',
            width: '450px', // Kích thước của phần hiển thị kết quả zoom
            height: '600px', // Kích thước của phần hiển thị kết quả zoom
            overflow: 'hidden',
            left: '100%', // Đặt bên phải ảnh
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${image})`,
            backgroundPosition: '0 0', // Điều chỉnh dựa vào vị trí con trỏ chuột
            backgroundSize: 'cover', // Đảm bảo ảnh phủ kín div
            backgroundColor: 'white', // Đặt một màu nền để không trong suốt
            opacity: 1, // Không trong suốt
            zIndex: 10, // Đảm bảo nó nằm trên các phần tử khác
            display: zooming ? 'block' : 'none',
        }}
        />

    </div>
  );
};

export default ProductImageZoom;
