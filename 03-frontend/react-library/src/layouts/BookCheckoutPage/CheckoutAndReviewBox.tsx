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
            Mượn sách
          </button>
        );
      } else if (props.isCheckedOut) {
        return (
          <p>
            <b>Đã mượn thành công</b>
          </p>
        );
      } else if (!props.isCheckedOut) {
        return <p className="text-danger">Bạn đã mượn quá nhiều sách</p>;
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
          <b>Cảm ơn bạn đã review</b>
        </p>
      );
    }
    return (
      <div>
        <hr />
        <p>Đăng nhập để có thể để lại review</p>
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
            <b>{props.currentLoansCount}/5 </b>
            sách đã mượn
          </p>
          <hr />
          {props.book &&
          props.book.copiesAvailable &&
          props.book.copiesAvailable > 0 ? (
            <h4 className="text-success">Số lượng sách</h4>
          ) : (
            <h4 className="text-danger">Sách hiện không còn</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{props.book?.copies} </b>
              quyển
            </p>
            <p className="col-6 lead">
              <b>{props.book?.copiesAvailable} </b>
              khả dụng (có thể mượn)
            </p>
          </div>
        </div>
        {buttonRender()}
        <hr />
        <p className="mt-3">
          Số lượng sách có thể được cập nhật sau khi chúng tôi nhập thêm sách
        </p>
        {reviewRender()}
      </div>
    </div>
  );
};
