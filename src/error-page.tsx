import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="justify-center items-center ">
      <h1>Oops!</h1>
      <p>
        We're sorry, but the page you requested could not be found or
        encountered an error.
      </p>
      <p>Please try one of the following:</p>
      <ul>
        <li>
          Go back to the <a href="/">homepage</a>
        </li>
        <li>Check if you entered the correct URL</li>
        <li>Contact our support team for assistance</li>
      </ul>
    </div>
  );
}
