-- drop database matrix;
-- addCartItem database matrix;
-- use matrix;
--
-- drop table orders;
-- drop table product;
-- drop table order_product;
-- drop table orders_products;
-- drop table user;
-- drop table cart_item;
--
--
-- CREATE TABLE orders (
--     id VARCHAR(50) PRIMARY KEY,
--     user_id VARCHAR(50) NOT NULL,
--     total_price INT NOT NULL,
--     order_date DATE NOT NULL,
--     shipping_address TEXT,
--     order_status VARCHAR(50),
--     payment_status VARCHAR(50),
--     payment_method VARCHAR(50)
-- );
--
-- CREATE TABLE product (
--      id INT PRIMARY KEY,
--      name VARCHAR(100) NOT NULL,
--      price INT NOT NULL,
--      category VARCHAR(50),
--      description TEXT,
--      image_url TEXT
-- );

INSERT INTO product (id, name, price, category, description, image_url) VALUES
    (201, 'Office Chair', 3200, 'Furniture', 'Ergonomic office chair with lumbar support', 'https://i5.walmartimages.com/asr/5a9c9482-c045-48e6-b540-f91885fa9007_1.62e743362e4a382af57edb00451d55b9.jpeg'),
    (202, 'Coffee Mug', 150, 'Kitchen', 'Ceramic coffee mug with matte finish', 'https://img.freepik.com/premium-photo/white-blank-ceramic-coffee-mug-mockup_1022426-2518.jpg'),
    (203, 'Backpack', 1200, 'Accessories', 'Durable backpack suitable for travel and office use', 'https://images-na.ssl-images-amazon.com/images/I/91kh7Y9VYNL._AC_SL1500_.jpg'),
    (204, 'Smartphone', 15000, 'Electronics', 'Latest model smartphone with high-resolution display', 'https://m.media-amazon.com/images/I/81js+FWp4XL._AC_SL1500_.jpg'),
    (205, 'Running Shoes', 2200, 'Footwear', 'Lightweight running shoes for daily workouts', 'https://i5.walmartimages.com/seo/ALLSWIFIT-Men-s-Slip-On-Walking-Running-Shoes-DreamLife-Lightweight-Non-Slip-Athletic-Sneakers-for-Gym-Tennis-and-Everyday-Workouts_994d03cc-754a-42e7-a314-82048fbc2494.8e1858cc3a9a092013e1a0622a82ab74.jpeg'),
    (206, 'Novel Book', 499, 'Books', 'Bestselling fiction novel paperback edition', 'https://templates.mediamodifier.com/5db698f47c3dc9731647a4e9/fiction-novel-book-cover-template.jpg'),
    (208, 'Teddy Bear', 350, 'Toys', 'Soft and cuddly teddy bear for kids', 'https://static-01.daraz.pk/p/7c2cf4d6cbf102cb109b702f19147cd6.jpg'),
    (209, 'Lipstick', 599, 'Beauty', 'Long-lasting matte lipstick in a vibrant red shade', 'https://tse3.mm.bing.net/th/id/OIP.YTB2WlzaguAb2e9e9lUaFAHaJV?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (210, 'Men''s T-Shirt', 450, 'Fashion Wear (Male)', 'Comfortable cotton t-shirt with a round neck', 'https://i5.walmartimages.com/asr/4157cd44-1dda-44e4-8973-a49a482425c9_1.79a3c179916e263a8b975595bdf04952.jpeg'),
    (211, 'Women''s Jeans',1500,'Fashion Wear (Ladies)','High-waist skinny jeans for a stylish look','https://tse2.mm.bing.net/th/id/OIP.J1i4Ab2JK3PhAKMC-QseOQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (212, 'Cookbook',750,'Books','Collection of international recipes and cooking tips','https://marketplace.canva.com/EAFpS1ceGQQ/1/0/1003w/canva-colorful-modern-cookbook-book-cover-YTEX1G_wu18.jpg'),
    (213,'Blender',2500,'Kitchen','High-power blender for smoothies and shakes','https://media3.bsh-group.com/Product_Shots/5120x/17923822_Product_Shot_MMB6386M_STP_def.webp'),
    (214,'Protein Powder',1800,'Grocery','Whey protein powder with chocolate flavor','https://cdn0.woolworths.media/content/wowproductimages/large/508160.jpg'),
    (215,'Dumbbells',1100,'Sports','Set of 5kg dumbbells for strength training','https://tse3.mm.bing.net/th/id/OIP.ChVYZPgpBX2hxrH6KXi1kAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (216,'Building Blocks',600,'Toys','Educational building blocks set for creative play','https://m.media-amazon.com/images/I/71mnsQS0n1L.jpg'),
    (217,'Face Serum',850,'Beauty','Vitamin C face serum for radiant skin','https://cdn.shopify.com/s/files/1/0834/3901/files/red-out-serum_d234e118-7db5-4600-a64b-779676d414ef.jpg?v=1551112687'),
    (218,'Men''s Formal Shirt',1100,'Fashion Wear (Male)','Slim-fit formal shirt for office and special events','https://www.creativefabrica.com/wp-content/uploads/2024/03/17/Man-Formal-Shirt-Mockup-Graphics-93496365-1.jpg'),
    (219,'Women''s Dress',1800,'Fashion Wear (Ladies)','Floral-print summer dress with a V-neck','https://img.kwcdn.com/product/1dab9a690e/63f7126c-f6a3-47ba-9755-705a8865abd3_1340x1786.jpeg.a.jpeg'),
    (220,'Science Fiction Novel',550,'Books','Hardcover science fiction novel by a renowned author','https://m.media-amazon.com/images/I/817o5Fvfi2L._SL1500_.jpg'),
    (221,'Dinner Set',4500,'Kitchen','12-piece ceramic dinner set for a family of four','https://image.made-in-china.com/2f0j00JBkToYIGZNbV/15-Pieces-of-Dinner-Set.jpg'),
    (222,'Breakfast Cereal',250,'Grocery','Multigrain breakfast cereal with dry fruits','https://www.eatthis.com/wp-content/uploads/sites/4/2021/04/general-mills-fiber-one-honey-clusters.jpg?resize=473'),
    (223,'Basketball',900,'Sports','Official size and weight basketball for outdoor play','https://tse4.mm.bing.net/th/id/OIP.2H2FP7z9E5b3boc5lQp61QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (224,'Toy Car',200,'Toys','Die-cast metal toy car in a sporty design','https://i5.walmartimages.ca/images/Enlarge/458/576/6000198458576.jpg'),
    (225,'Mascara',450,'Beauty','Volumizing mascara for long and curled lashes','https://tse4.mm.bing.net/th/id/OIP.UUbMoRTRCiaopkzwlUX8nAHaNF?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (226,'Men''s Hoodie',1600,'Fashion Wear (Male)','Casual hoodie with a fleece lining for warmth','https://i5.walmartimages.com/asr/3a043039-85a5-4510-b6ff-f7521d8705bf_1.090f41bdf20ceb990ac16daa8d626417.jpeg'),
    (227,'Women''s Handbag',2000,'Fashion Wear (Ladies)','Faux leather handbag with multiple compartments','https://sc04.alicdn.com/kf/He18cc5474e23408fab819fc7770931814/254097870/He18cc5474e23408fab819fc7770931814.jpg'),
    (228,'Mystery Book',480,'Books','Gripping mystery novel with an unexpected twist','https://tse4.mm.bing.net/th/id/OIP.J2bLqbAtZKC7k1ns0xEiRQHaLA?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (229,'Air Fryer',5500,'Kitchen','Digital air fryer for healthy, oil-free cooking','https://m.media-amazon.com/images/I/91pueyOiwCL.jpg'),
    (230,'Olive Oil',700,'Grocery','Extra virgin olive oil for cooking and salads','https://answersafrica.com/wp-content/uploads/2016/03/10-amazing-benefits-of-olive-oil.jpg'),
    (231,'Football',800,'Sports','Durable football for training and matches','https://tse1.mm.bing.net/th/id/OIP.ljks2Vs72e28tHV40IzLkgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (233,'Eyeshadow Palette',1100,'Beauty','Palette with 12 highly pigmented eyeshadow shades','https://tse1.mm.bing.net/th/id/OIP.0gbi_ErEBgHKu08KyJ0u4QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (234,'Men''s Sneakers',2500,'Fashion Wear (Male)','Stylish sneakers for casual and everyday wear','https://www.themodestman.com/wp-content/uploads/2021/06/Allen-Edmonds-Courtside-Brown-Leather-Sneaker.jpg'),
    (235,'Women''s Scarf',350,'Fashion Wear (Ladies)','Lightweight scarf with a unique pattern','https://tse3.mm.bing.net/th/id/OIP.boDdE3du_NPgJ2cKIDIIMgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (236,'Self-Help Book',600,'Books','Bestselling self-help book for personal growth','https://cdn.venngage.com/template/thumbnail/full/39198110-3724-4046-972c-b4e4088926d9.webp'),
    (237,'Time Management Book',800,'Books','Bestselling self-help book for time management','https://tse2.mm.bing.net/th/id/OIP.I99h5ARcusOUDlkrcPhBIgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (238,'Programming Java Book',1200,'Books','Bestselling self-help book for Programming in Java','https://cdn.shopify.com/s/files/1/0514/0014/7144/products/9789389845143.jpg?v=1623762437'),
    (239,'Face Lotion',500,'Beauty','Aveeno Positively Radiant Daily Facial Moisturizing Sunscreen Lotion ...','https://i5.walmartimages.com/seo/Aveeno-Positively-Radiant-Daily-Face-Moisturizer-Lotion-with-SPF-15-4-oz_4fa35dc8-33b7-484a-bd80-7d3ffcc7db13.37bd22e8fcd1b1ab32314f9ca433fb5a.jpeg'),
    (240,'Vitamin C Serum',899,'Beauty','Roushun Vitamin C Serum','https://khushiyan.pk/wp-content/uploads/2021/01/5c77ce838b6ef908bdecc602e4db614f-1-scaled.jpg'),
    (241,'Conceller',700,'Beauty','Nars Radiant Creamy Concealer | Best Concealer Used by Makeup Artists','https://tse4.mm.bing.net/th/id/OIP.9iS3T-cYmtWt4uZgTBZbGgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (242,'Coconut Oil',180,'Grocery','Fresh and 100% pure Coconut Oil Best in Market','https://img.freepik.com/premium-photo/coconuts-coconut-leaves-coconut-oil-product-photography-background_928503-523.jpg'),
    (243,'Toaster',2500,'Kitchen','2-slice pop-up toaster with adjustable browning control and crumb tray','https://tse2.mm.bing.net/th/id/OIP.bl3HnoA3eIU3Qq5joo9QVwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3'),
    (244,'Electric Kettle',1800,'Kitchen','1.8L stainless steel electric kettle with auto shut-off and boil-dry protection','https://img.freepik.com/premium-psd/electric-kettle-transparent-background-png-image_967897-1670.jpg'),
    (245,'Microwave Oven',7200,'Kitchen','20L convection microwave oven with grill function, digital controls, and multiple auto-cook menus','https://img.freepik.com/premium-psd/microwave-oven-png-isolated-transparent-background_645927-10560.jpg'),
    (246,'Badminton Racket',2200,'Sports','Lightweight graphite badminton racket with high-tension strings, ideal for beginners and intermediate players','https://img.freepik.com/premium-psd/badminton-racket-3d-isolated-render-transparent-background-png-psd_1130573-104397.jpg?w=740'),
    (247,'Adidas Sports T-shirt',650,'T-shirts','Breathable polyester sports T-shirt with quick-dry technology, perfect for workouts and running','https://images-na.ssl-images-amazon.com/images/I/71zBlO3Y3IL._AC_SL1100_.jpg'),
    (248,'Puma Graphic T-shirt',700,'T-shirts','Trendy cotton graphic T-shirt with bold Puma logo print, casual wear for men and women','https://media.sivasdescalzo.com/media/catalog/product/6/2/627090-04_sivasdescalzo-Puma-PUMA_X_NOAH_GRAPHIC-1718620304-1.jpg?width=1080'),
    (249,'Levi’s Classic T-shirt',800,'T-shirts','Soft cotton round-neck T-shirt with Levi’s signature branding, ideal for everyday wear','https://lsco.scene7.com/is/image/lsco/Levis/clothing/224890111-front-pdp.jpg?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800'),
    (256,'Westmire A56 Headset',9999,'Electronics','Amazing Headphone','https://media.littlewoods.com/i/littlewoods/V8BLG_SQ1_0000000088_NO_COLOR_SLf?$pdp_1650x2199_hi_res$&fmt=webp'),
    (257,'Wooden Bookshelf',6500,'Furniture','Sturdy wooden bookshelf with 5 spacious shelves','https://m.media-amazon.com/images/I/71DSTEQrMIL._SL1210_.jpg'),
    (258,'Modern Sofa',45000,'Furniture','Comfortable 3-seater fabric sofa with modern design','https://tse3.mm.bing.net/th/id/OIP.VYNr6HpneenEWC0nAwvszwHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3');


INSERT INTO user (id, name, email, password, shipping_address, payment_details) VALUES
    ('1', 'Saksham', 's@test.com', 's@123456', 'Coimbatore', 'UPI'),
    ('2', 'Jayesh', 'j@test.com', 'j@123456', 'Pune', 'Net Banking');
