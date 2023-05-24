const SVGIcon = ({ className }: { className: string }) => {
  return (
    <svg className={className} width="50" height="50" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.71 4.29l-3-3L10 1H4L3 2v12l1 1h9l1-1V5l-.29-.71zM13 14H4V2h5v4h4v8zm-3-9V2l3 3h-3z"
      />
    </svg>
  )
}

export default SVGIcon
