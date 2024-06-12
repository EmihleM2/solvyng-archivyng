import useMutation from "../hooks/useMutation";

function MyComponent() {
  const { mutate, isLoading, progress } = useMutation({
    url: "/upload",
    method: "POST",
  });

  return (
    <div>
      <button onClick={() => mutate(myData)}>Upload</button>
      {isLoading && (
        <div className="w-full h-2 bg-gray-200">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
