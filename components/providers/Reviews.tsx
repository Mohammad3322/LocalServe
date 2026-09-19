import { customers } from "@/lib/data/seed/customers";
import { reviews } from "@/lib/data/seed/reviews";
import { Card } from "@heroui/react";
import Image from "next/image";

type reviewsPros = {
  slug: string;
};
function Reviews({ slug }: reviewsPros) {
  const providerReviews = reviews.filter(
    (reviw) => reviw.providerSlug === slug,
  );

  return (
    <div id="reviews" className="border-border border-b py-12">
      <div className="">
        <h2 className="text-text-primary text-2xl font-semibold">Reviews</h2>

        <p className="text-text-secondary mt-2 text-sm">Customers Reviews</p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {providerReviews.length > 0 &&
          providerReviews.map((review) => {
            const customer = customers.find(
              (customer) => customer.id === review.customerId,
            );

            return (
              <div key={review.id}>
                <Card>
                  <Card.Header>
                    {customer && (
                      <div className="flex items-center gap-3">
                        <Image
                          src={customer?.imageUrl}
                          alt=""
                          width={100}
                          height={100}
                          className="h-10 w-10 rounded-full"
                        />
                        <h3 className="font-bold"> {customer.name}</h3>
                      </div>
                    )}
                  </Card.Header>
                  <Card.Content>{review.content}</Card.Content>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Reviews;
