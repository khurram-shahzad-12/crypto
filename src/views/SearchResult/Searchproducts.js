import React, { useRef } from "react";
import { Card } from './Card';
import { Row, Col } from "react-bootstrap";

export const Searchproducts = ({ products }) => {

    // const NUM_PER_PAGE = 20;

    // const TOTAL_PAGES = Math.ceil(products.length / NUM_PER_PAGE);

    // const triggerRef = useRef(null);
    // const onGrabData = (currentPage) => {
    //     console.log("promise", currentPage);
    //     return new Promise((resolve) => {
    //         if (currentPage <= TOTAL_PAGES) {
    //             const data = products.slice(
    //                 (currentPage - 1) * NUM_PER_PAGE,
    //                 currentPage * NUM_PER_PAGE
    //             );
    //             resolve(data);
    //         }

    //     });
    // };

    // const { data, loading } = useLazyLoad({ triggerRef, onGrabData });


    return (
        <>
            <Row>
                {products.map((items, index) => {
                    return (
                        <Col key={index}  lg={4} md={4} sm={6} xs={12}>
                            <Card data={items} />
                        </Col>
                    )
                })}
            </Row>

            {/* <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>

            </div> */}
        </>
    );
}