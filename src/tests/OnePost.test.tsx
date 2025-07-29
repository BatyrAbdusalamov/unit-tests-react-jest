import { render } from "@testing-library/react";
import OnePost from "../components/allPost/onePost/onePost";
import { Posts } from "../components/pageOnePost/types/types";
import { useSelector } from "react-redux";
jest.mock('react-redux', () => ({
    useSelector: jest.fn()
}))

describe('Test OnePost component', () => {
    beforeEach(() => {
        (useSelector as jest.Mock).mockReturnValue('key')
    })
    it('Render test correct props in snapshot', () => {
        const mockPostData: Posts = { tags: [{ id: 0, nametag: 'Tag1' }, { id: 1, nametag: 'Tag2' }], author: { id: 10, login: 'login', name: 'A.Artel', sername: 'Porticv' }, article: 'Article1', text: 'Text', id: 10, createdAt: '20.20.2050' }
        const { asFragment } = render(<OnePost {...mockPostData} />)
        expect(asFragment()).toMatchSnapshot();
    })

    it('Render test uncorrect props in snapshot', () => {
        const mockPostData: Posts = { tags: [{ id: 0, nametag: '' }, { id: 0, nametag: '' }], author: { id: 0, login: '', name: '', sername: '' }, article: '', text: '', id: 0, createdAt: '' }
        const { asFragment } = render(<OnePost {...mockPostData} />)
        expect(asFragment()).toMatchSnapshot();
    })

    it('Render test have image prop in snapshot', () => {
        const mockPostData: Posts = { tags: [{ id: 0, nametag: 'Tag1' }, { id: 1, nametag: 'Tag2' }], author: { id: 10, login: 'login', name: 'A.Artel', sername: 'Porticv' }, image: { path: 'https://img.ru/image.png' }, article: 'Article1', text: 'Text', id: 10, createdAt: '20.20.2050' }
        const { asFragment } = render(<OnePost {...mockPostData} />)
        expect(asFragment()).toMatchSnapshot();
    })

    it('Render test have comments prop in snapshot', () => {
        const mockPostData: Posts = { tags: [{ id: 0, nametag: 'Tag1' }, { id: 1, nametag: 'Tag2' }], author: { id: 10, login: 'login', name: 'A.Artel', sername: 'Porticv' }, comments: [{ id: 0, text: 'Good' }, { id: 1, text: 'Bad' }, { id: 2, text: 'Approve' }], article: 'Article1', text: 'Text', id: 10, createdAt: '20.20.2050' }
        const { asFragment } = render(<OnePost {...mockPostData} />)
        expect(asFragment()).toMatchSnapshot();
    })
})