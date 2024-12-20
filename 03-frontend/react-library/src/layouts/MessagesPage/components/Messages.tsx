import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import MessageModel from "../../../models/MessageModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";

export const Messages = () => {
  const { authState } = useOktaAuth();
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Messages
  const [messages, setMessages] = useState<MessageModel[]>([]);

  // Pagination
  const [messagesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (authState && authState?.isAuthenticated) {
        const url = `http://localhost:8080/api/messages/search/findByUserEmail/?userEmail=${
          authState?.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=${messagesPerPage}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const messagesResponse = await fetch(url, requestOptions);
        if (!messagesResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const messagesResponseJson = await messagesResponse.json();
        setMessages(messagesResponseJson._embedded.messages);
        setTotalPages(messagesResponseJson.page.totalPages);
      }
      setIsLoadingMessages(false);
    };
    fetchUserMessages().catch((error: any) => {
      setIsLoadingMessages(false);
      setHttpError(error.messages);
    });
    window.scrollTo(0, 0);
  }, [authState, currentPage]);

  if (isLoadingMessages) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {messages.length > 0 ? (
        <>
          <h5>Current Q/A: </h5>
          {messages.map((message) => (
            <div key={message.id}>
              <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>
                  Case #{message.id}: {message.title}
                </h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                  <h5>Phản hồi: </h5>
                  {message.response && message.adminEmail ? (
                    <>
                      <h6>{message.adminEmail} (admin)</h6>
                      <p>{message.response}</p>
                    </>
                  ) : (
                    <p>
                      <i>Admin chưa phản hồi. vui lòng chờ</i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h5>câu hỏi bạn đã gửi</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
