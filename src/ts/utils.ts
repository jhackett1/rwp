interface PostcodeData {
  result?: {
    admin_district?: string
  }
}

export const isPostcodeElecting = (data: PostcodeData): boolean =>
  ["Sheffield", "Barnsley", "Doncaster", "Rotherham"].includes(
    data.result.admin_district
  )
