ALTER TABLE user_products
    ADD CONSTRAINT unique_equip_id
        UNIQUE (product_id, user_id);