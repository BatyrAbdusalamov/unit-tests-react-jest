import { render } from "@testing-library/react";
import OnePost from "../components/allPost/onePost/onePost";
import { Posts } from "../components/pageOnePost/types/types";
import { useSelector } from "react-redux";
jest.mock('react-redux', () => ({
    useSelector: jest.fn()
}))

describe('Test OnePost component', () => {
    it('Render test in snapshot', () => {
        (useSelector as jest.Mock).mockReturnValue('key')
        const mockPostData: Posts = { tags: [{id: 0, nametag: 'Tag1'}, {id: 1, nametag: 'Tag2'}], author: { id: 10, login: 'login', name: 'A.Artel', sername: 'Porticv'}, article: 'Article1', text: 'Text', id: 10, createdAt: '20.20.2050' }
        const { asFragment } = render(<OnePost {...mockPostData}/>)
        expect(asFragment()).toMatchSnapshot();
    })
})