import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export const SPMenus = () => {
  const menuList = [
    {
      title: '予約者',
      item: [
        {
          itemTitle: 'アジェンダ一覧ページ'
        },
      ]
    },
    {
      title: '管理者',
      item: [
        {
          itemTitle: 'ログイン'
        },
        {
          itemTitle: '管理者登録'
        }
      ],

    },

  ]

  return (
    <div className='pt-24'>

      <div className="grid grid-cols-1 ">
        <div className="pb-10">

          {menuList.map((menu, index) => (
            <div key={index}>
              <div className="p-[10px] border-b border-b-[#E1E1E1]">

                <p className="text-[#808080] text-base font-medium">{menu.title}</p>
              </div>

              {menu.item.map((item, index) => (
                <div key={index} className='p-[10px] flex justify-between items-center text-[#BA00FF]'>
                  <p className="font-medium text-base">{item.itemTitle}</p>
                  <KeyboardArrowRightIcon className='w-5 h-5' />
                </div>
              ))}
            </div>


          ))}
        </div>
        <div className="p-[10px] text-sm font-medium border-t border-t-[#E1E1E1] flex flex-col gap-4">
          <p>運営会社</p>
          <p>プライバシーポリシー</p>
          <p>お問い合わせ</p>
        </div>
      </div>
    </div>
  )
}

