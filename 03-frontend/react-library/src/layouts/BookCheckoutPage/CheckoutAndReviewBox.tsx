import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveAReview } from "../Utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  currentLoansCount: number;
  isAuthenticated: any;
  isCheckedOut: boolean;
  checkoutBook: any;
  isReviewLeft: boolean;
  submitReview: any;
}> = (props) => {
  function buttonRender() {
    if (props.isAuthenticated) {
      if (!props.isCheckedOut && props.currentLoansCount < 5) {
        return (
          <button
            onClick={() => props.checkoutBook()}
            className="btn btn-success btn-lg"
          >
            Checkout
          </button>
        );
      } else if (props.isCheckedOut) {
        return (
          <p>
            <b>Sách đã được mượn</b>
          </p>
        );
      } else if (!props.isCheckedOut) {
        return <p className="text-danger">Có quá nhiều sách đã được mượn.</p>;
      }
    }
    return (
      <Link to={"/login"} className="btn btn-success btn-lg">
        Đăng nhập
      </Link>
    );
  }

  function reviewRender() {
    if (props.isAuthenticated && !props.isReviewLeft) {
      return (
        <p>
          <LeaveAReview submitReview={props.submitReview} />
        </p>
      );
    } else if (props.isAuthenticated && props.isReviewLeft) {
      return (
        <p>
          <b>Cảm ơn lời đánh giá của b</b>
        </p>
      );
    }
    return (
      <div>
        <hr />
        <p>Đăng nhập để đánh giá sách</p>
      </div>
    );
  }

  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            Đã mượn <b>{props.currentLoansCount}/5 </b> quyển
          </p>
          <hr />
          {props.book &&
          props.book.copiesAvailable &&
          props.book.copiesAvailable > 0 ? (
            <h4 className="text-success">Số lượng sách</h4>
          ) : (
            <h4 className="text-danger">Chưa có sách</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{props.book?.copies} </b>
              quyển
            </p>
            <p className="col-6 lead">
              <b>{props.book?.copiesAvailable} </b>
              Khả dụng (mượn đc)
            </p>
          </div>
        </div>
        {buttonRender()}
        <hr />
        <p className="mt-3">Con số này có thể đc thay đổi</p>
        {reviewRender()}
      </div>
    </div>
  );
};
