import React from "react";
import Accordion from "react-bootstrap/Accordion";

const FAQs = () => {
  const options = [
    {
      Questions: <h4>1. How to purchase Saver Zone products?</h4>,
      Answers: (
        <p>
          Saver Zone Terms - Grab any branded products in this list with
          unbeatable offers and save more. Each order is eligible for 1 Saver
          Zone Product only. Every order should fulfill minimum purchase amount
          and it varies as per products in this list. Terms and Conditions
          Applied.
        </p>
      ),
    },
    {
      Questions: <h4>2. How to purchase deal of the day products?</h4>,
      Answers: (
        <ul style={{ listStyle: "none" }}>
          <li>
            â€¢ One offer product can be added per order with total minimum
            purchase amount of AED 35, 100 AED for free shipping.
          </li>
          <li>
            â€¢ After adding offer product to the cart, it can be removed incase
            if the customer wants to add another offer product.
          </li>
          <li>
            â€¢ Customer need to click on view cart and unselect any chosen
            product so that they can add a new offer product.
          </li>
        </ul>
      ),
    },
    {
      Questions: (
        <h4>3. Can you please update me if the size is back in stock?</h4>
      ),
      Answers: (
        <p>
          You shall be updated on priority as soon as we get your pick in stock.
        </p>
      ),
    },
    {
      Questions: <h4>4.How can I reach you other than the contact number?</h4>,
      Answers: (
        <p>
          The phone lines were disrupted. We regret the inconvenience caused to
          you. You can drop usa message and our customer service representative
          will connect with you.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          5. How can i make an inquiry about the product or know the order
          status?
        </h4>
      ),
      Answers: (
        <p>
          Want to know about the order status or inquire about the product? Give
          us a call at (971) 4 2582959 or drop an email at info@ourshopee.com ,
          app@ourshopee.com
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          6. What can I do if your Customer Service Representative Does not
          satisfy my need?
        </h4>
      ),
      Answers: (
        <p>
          In case the customer service representative does not satisfy you, we
          will appoint Chief Manager-Customer Service to resolve your issues. He
          will take 1 day to review the dispute and respond.
        </p>
      ),
    },
    {
      Questions: <h4>7. How can I apply for jobs at Ourshopee.com?</h4>,
      Answers: (
        <p>
          If you are interested to apply, drop in your email at
          careers@ourshoppe.com or through career session on our website
          https://www.ourshopee.com/careers
        </p>
      ),
    },
    {
      Questions: <h4>8. How do I place an order?</h4>,
      Answers: (
        <p>
          You can place the order online through our portal www.ourshoppe.com.
        </p>
      ),
    },
    {
      Questions: (
        <h4>9. How can I modify my order? Will you charge extra for it?</h4>
      ),
      Answers: (
        <p>
          Unfortunately, you cannot modify the order after you have placed it.
          The addition or the removal of the products is not possible. However,
          you can cancel the order and place a new one.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          10. What if I wish to change the delivery address after placing the
          order?
        </h4>
      ),
      Answers: (
        <p>
          Once you have placed the order, you cannot change the delivery
          address. However, you can cancel the order and place a new one with
          the preferred address.
        </p>
      ),
    },
    {
      Questions: <h4>11. Can the delivery date be changed?</h4>,
      Answers: (
        <p>
          You are requested to speak to the courier boy in this regards.
          Packaging and delivery from our end is always on time.
        </p>
      ),
    },
    {
      Questions: <h4>12. What is the general order processing time?</h4>,
      Answers: (
        <p>
          It generally takes a period of 2-5 days to process the order and
          dispatch it.
        </p>
      ),
    },
    {
      Questions: (
        <h4>13. How can I be assured that my order is placd successfully?</h4>
      ),
      Answers: (
        <p>
          Once you place the order, you will be given a confirmation message and
          an e-mail with the details of the products.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          14. If I receive my multiple product order atdifferent times. Should I
          pay the price for the respective product only or pay for the complete
          order?
        </h4>
      ),
      Answers: (
        <p>
          No, you will have to pay for the complete order as soon as you receive
          the first product.
        </p>
      ),
    },
    {
      Questions: <h4>15. How can I update my billing address?</h4>,
      Answers: (
        <p>
          You can update the billing address under the Profile Section. Go to
          the profile sectionïƒ settingsïƒ address changeïƒ save the update.
        </p>
      ),
    },
    {
      Questions: <h4>16. Can I cancel my order? If yes, how?</h4>,
      Answers: <p>Yes. You can cancel the order.</p>,
    },
    {
      Questions: <h4>17. Will I get a refund for my cancelled order</h4>,
      Answers: (
        <p>
          Yes, you can get a refund for the orders if it satisfies our normal
          terms and conditions.
        </p>
      ),
    },
    {
      Questions: <h4>18. Do we have cancellation timeline?</h4>,
      Answers: (
        <p>
          You can check the order status online. If in case, it has not been
          despatched you can cancel the order. Post the dispatch, we do not
          accept complete cancellation. You can deny the acceptance of the
          products and will have to pay the amount. You can then later shop for
          the products of your choice.
        </p>
      ),
    },
    {
      Questions: <h4>19. Can I return one/few products if I change y mind?</h4>,
      Answers: (
        <p>
          Yes, we accept the return of one/ few products if you change your
          mind.
        </p>
      ),
    },
    {
      Questions: (
        <h4>20. Do you have any app so that I can shop ove the phone?</h4>
      ),
      Answers: (
        <p>
          Yes, we do have utility app powered by android that can simplify your
          shopping experience.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          21. In case, I am not satisfied with the produts purchased after
          receiving the delivery, what can I do for it?
        </h4>
      ),
      Answers: (
        <p>
          If you do not find the products satisfactory as described, you can get
          the products exchanged within a period of 15 days or so.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          22. What should I do, if the color of the outft received is completely
          different from that displayed in the picture?
        </h4>
      ),
      Answers: (
        <p>
          This is rare to happen.You should always read the product description
          as well. However, if this has happened to you, you can get the product
          changed/replaced immediately.
        </p>
      ),
    },
    {
      Questions: <h4>23. Do you deliver worldwide?</h4>,
      Answers: (
        <p>
          We have a strong network of delivery channels across UAE , OMAN,
          QATAR, KUWAIT, BAHRAIN
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          24. Can I get number of a single item in one oder or I have to make
          multiple orders?
        </h4>
      ),
      Answers: (
        <p>
          We do not entertain bulk orders. However, if it is about only about
          one plus types of similar items, we can do it.
        </p>
      ),
    },
    {
      Questions: <h4>25. What can be done if the size doesnt fit a all?</h4>,
      Answers: (
        <p>
          You can immediately place the request to exchange the product. In
          case, we will have the item in smaller/bigger size, we will exchange
          it. Or else you can buy another product in exchange for it.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          26. How can I add an item in the existing orde that has already been
          placed?
        </h4>
      ),
      Answers: (
        <p>
          Unluckily, there is no such option. You will have to place a new
          order.
        </p>
      ),
    },
    {
      Questions: <h4>27. What are the acceptable payment methods?</h4>,
      Answers: (
        <p>
          Some of the popular payment methods that we accept are: Credit Card
          Debit Card Net banking Cash-On-Delivery
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          28. Do you levy extra charges if there is a Cah-on-Delivery purchase
          made?
        </h4>
      ),
      Answers: (
        <p>
          No. We donâ€™t charge an additional charge for Cash on delivery. Only
          you have to pay is normal delivery charges stipulated by us.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          29. What should I do if the payment fails, butmy account is debited
          with the amount?
        </h4>
      ),
      Answers: (
        <p>
          In case, the payment is a failure and still, the account gets debited,
          the payment will be credited back within 7 business days.
        </p>
      ),
    },
    {
      Questions: <h4>30. Do you pose any hidden charges?</h4>,
      Answers: (
        <p>
          The product price displayed includes all the taxes. Only the delivery
          charges will be extra in some of the cases.
        </p>
      ),
    },
    {
      Questions: (
        <h4>31. Do I get a notification before the deliver of the order?</h4>
      ),
      Answers: (
        <p>
          The customers will receive a notification via an SMS. The courier
          person can also make a call to make a convenient delivery.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          32. The committed delivery time of my order isover. What should I do?
        </h4>
      ),
      Answers: (
        <p>
          We regret the inconvenience. In such a case, you should immediately
          drop in a mail to the customer care representative or contact them,
          whichever is convenient.
        </p>
      ),
    },
    {
      Questions: <h4>33. Do you deliver orders on all weekdays?</h4>,
      Answers: (
        <p>
          We complete all our order deliveries from Monday to Saturday except
          National and State Holidays.
        </p>
      ),
    },
    {
      Questions: <h4>34. How do I track my order?</h4>,
      Answers: (
        <p>
          You can track the order via email, SMS or be calling the customer care
          Toll Free. Use your order number in all the three cases to know the
          status.
        </p>
      ),
    },
    {
      Questions: (
        <h4>35. The order delivery time has been exceeded.What should I do?</h4>
      ),
      Answers: (
        <p>
          We regret the inconvenience, but generally, we intimate our clients
          about the delivery status and time. In case, you havenâ€™t received
          the notification, please write to us @ info@ourshopee.com/
          support@ourshopee.com or contact our online chat agent on site or
          connect with us through (971) 4 2582959
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          36. Everytime I browse your web page, it asks e to register. Is it
          necessary to get that done?
        </h4>
      ),
      Answers: (
        <p>
          No, it is not necessary, but registration can improve the shopping
          experience for you.
        </p>
      ),
    },
    {
      Questions: <h4>37. I forgot my password. What should I do now?</h4>,
      Answers: (
        <p>
          In case, you forgot your password, we will reset that for you. Click
          on the option of â€œLost your passwordâ€ just under the window tab
          from where you log in.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          38. I feel bored entering the address and othe details every time I
          shop. Is there an option to store this information?
        </h4>
      ),
      Answers: (
        <p>
          Yes, once when you enter all the information, you can click on â€œsave
          the detailsâ€ to store all your information.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          39. How will you notify me for the deals, arrials and discounts?
        </h4>
      ),
      Answers: <p>We will notify you via an SMS, email on your account.</p>,
    },
    {
      Questions: <h4>40. Which items can be exchanged?</h4>,
      Answers: (
        <p>
          All items except innerwear, lingerie, beauty products, swimsuits,
          jewelry and fragrances can be exchanged.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          41. I do not own a credit card/debit card/netbnking. How can I make
          the payment?
        </h4>
      ),
      Answers: <p>The customers can opt for the Cash-on-Delivery options.</p>,
    },
    {
      Questions: (
        <h4>42. Do you limit the shopping for the Cash on elivery options?</h4>
      ),
      Answers: (
        <p>No, We don`t keep any limit for the Cash-on-Delivery options.</p>
      ),
    },
    {
      Questions: (
        <h4>
          43. The Cash-on-Delivery option is not availabe for my location. How
          else can I make the payment?
        </h4>
      ),
      Answers: (
        <p>
          You can make the payment through other payment modes like Credit Card,
          Debit Card and Net banking.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          44. I realized that my card details have been ompromised. What should
          I do?
        </h4>
      ),
      Answers: (
        <p>
          We do not store the card or bank details of the customers. It is
          absolutely suspicious if something of this sort has happened to you.
          You should intimate your bank immediately about this.
        </p>
      ),
    },
    {
      Questions: <h4>45.How will the items be packed?</h4>,
      Answers: (
        <p>
          We take care of each item in the order. The packaging will be
          waterproof with plastic or bubble wrap, especially the fragile items.
        </p>
      ),
    },
    {
      Questions: <h4>46. How will the product delivery be done?</h4>,
      Answers: (
        <p>
          We ensure in time delivery with the help of the authentic courier
          service companies.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          47. What should I do if I find(on delivery) tht the product has been
          tempered with?
        </h4>
      ),
      Answers: (
        <p>
          If you feel that the product has been tempered with, do not accept the
          courier. You can call us immediately.
        </p>
      ),
    },
    {
      Questions: (
        <h4>
          48. After opening my packet, I found one of th product was broken.
          What should I do?
        </h4>
      ),
      Answers: (
        <p>
          You should pack the items along with its pieces, intact. After which
          you should drop in an e-mail or connect with the customer care
          representative.
        </p>
      ),
    },
    {
      Questions: <h4>49. Where can I give my feedback?</h4>,
      Answers: (
        <p>
          You are requested to give your kind and valuable feedback on our
          â€œFeedbackâ€ page. We have a rating page where you can rate us Or you
          can rate us through our Facebook, Twitter, Instagram and other social
          media pages.
        </p>
      ),
    },
    {
      Questions: <h4>50. Can you keep me posted on the latest additons?</h4>,
      Answers: (
        <p>
          Check our website for the latest additions. Register your mail id to
          receive regular updates.
        </p>
      ),
    },
    {
      Questions: <h4>51. Please tell me about the return/refund polcy?</h4>,
      Answers: (
        <p>
          We do provide refund facilities. But with certain products. However,
          customers can place their requests to exchange items too. The process
          will take a minimum of 3-7 days.
        </p>
      ),
    },
    {
      Questions: <h4>52. Looking For pocket friendly products?</h4>,
      Answers: (
        <ul style={{ listStyle: "none" }}>
          <li>
            â€¢ Ourshopee refurbished products is best option for your needs and
            in budget.
          </li>
          <li>
            â€¢ Refurbished products are in better condition than second-hand
            items.
          </li>
          <li>
            â€¢ All our refurbished products go through a rigorous quality check
            process to ensure all problems are fixed.
          </li>
          <li>
            â€¢ A team of professionals test and restore them to perfect working
            condition.
          </li>
          <li>
            â€¢ A refurbished product comes with little to no-sign of external
            damage.{" "}
          </li>
          <li>
            {" "}
            â€¢ For ease your mind we provide 1 month Ourshopee warranty.
          </li>
        </ul>
      ),
    },
  ];

  return (
    <div className="FAQs">
      <Accordion className="accordiondefault" defaultActiveKey="1">
        {options.map((each, i) => (
          <Accordion.Item className="AccordionItem" key={i} eventKey={i}>
            <Accordion.Header>
              {each.id}. {each.Questions}{" "}
            </Accordion.Header>
            <Accordion.Body>{each.Answers}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQs;
