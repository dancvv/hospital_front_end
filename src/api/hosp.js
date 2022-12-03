
import request from '@/utils/request'

export default {
    // 医院列表
    getPageList(page, limit, searchObj){
        return request({
            url: `/admin/hosp/hospital/list/${page}/${limit}`,
            method: 'get',
            params: searchObj,
        })
    },
    // 根据dictcode查询所有字节点（所有省）
    findByDictCode(dictCode){
        return request({
            url:`/admin/cmn/dict/findByDictCode/${dictCode}`,
            method: 'get'
        })
    },

    // 根据id查询自数据列表
    findByParentId(dictCode){
        return request({
            url: `/admin/cmn/dict/findChildData/${dictCode}`,
            method: 'get'
        })
    },
    // update the hosp status
    updateStatus(id, status){
        return request({
            url: `/admin/hosp/hospital/updateHospStatus/${id}/${status}`,
            method: 'get'
        })
    },
    // 查看医院详情
    getHospById(id){
        return request({
            url: `/admin/hosp/hospital/showHospDetail/${id}`,
            method: 'get'
        })
    },
    // 查看医院详情
    getDepartmentByHoscode(hoscode){
        return request({
            url: `/admin/hosp/department/getDeptList/${hoscode}`,
            method: 'get'
        })
    }


}