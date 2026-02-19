import React from "react"
import bidslogo from "./assets/affiliates/bids.jpg"
import dataladlogo from "./assets/affiliates/datalad.jpg"
import nihlogo from "./assets/affiliates/nih-bi-logo.png"

export const affiliateContent = [
  {
    logo: bidslogo,
    header: "Validation Using BIDS",
    contentOne: (
      <>
        The{" "}
        <a href="https://bids.neuroimaging.io/">Brain Imaging Data Structure</a>
        {" "}
        (BIDS) is an emerging standard for the organization of neuroimaging
        data.
      </>
    ),
    contentTwo: (
      <>
        Want to contribute to BIDS?
        <br /> Visit the{" "}
        <a href="https://groups.google.com/g/bids-discussion">
          Google discussion group
        </a>{" "}
        to contribute.
      </>
    ),
  },
  {
    logo: dataladlogo,
    header: "Stored Using DataLad",
    contentOne: "",
    contentTwo: (
      <>
        A data management solution built on{" "}
        <a href="https://github.com/">Git</a> and{" "}
        <a href="https://git-annex.branchable.com/">Git-annex</a>. Read more
        about <a href="https://www.datalad.org/">DataLad</a>.
      </>
    ),
  },
]
