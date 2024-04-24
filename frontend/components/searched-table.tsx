import { Food } from "@/types/types";

interface SearchedTableProps {
    data: Food[]
}

const SearchedTable: React.FC<SearchedTableProps> = ({data}) => {
    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    <p>{item.food_name}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchedTable;