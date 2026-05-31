import { Env } from '../types'

export async function reset(
  event: ScheduledEvent,
  env: Env,
  ctx: ExecutionContext,
): Promise<void> {
  console.log('开始执行定时清理任务')

  try {
    const kv = env.road
    const keys = await kv.list()

    if (keys.keys.length === 0) {
      console.log('KV 数据库为空，无需清理')
      return
    }

    console.log(`找到 ${keys.keys.length} 个键，开始删除`)

    const deletePromises = keys.keys.map(key => kv.delete(key.name))
    await Promise.all(deletePromises)

    console.log(`成功删除 ${keys.keys.length} 个键`)
    console.log('定时清理任务完成')
  } catch (error) {
    console.error('定时清理任务失败:', error)
    throw error
  }
}
