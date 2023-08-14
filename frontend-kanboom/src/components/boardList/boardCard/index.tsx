import Link from "next/link";

interface BoardCardProps {
    board: {
      id: number;
      name: string;
    };
  }

function BoardCard({ board }: BoardCardProps) {
    return (
        <Link href={`board/${board.id}`}>
          <li className="bg-green1 p-[16px] text-white text-20 font-bold min-w-[240px] w-[24%] h-[104px] rounded-[16px] cursor-pointer">
              <h3>{board.name}</h3>
          </li>
        </Link>
    );
}

export default BoardCard;
